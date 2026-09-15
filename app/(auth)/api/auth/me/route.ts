import { MeResponse, SessionResponse, User } from "@/features/auth/auth.type";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

if (!NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const userCookie = cookieStore.get("user")?.value;

  if (!token) {
    return NextResponse.json<MeResponse>(
      {
        authorized: false,
        user: null,
      },
      { status: 401 },
    );
  }
  let backendSession: SessionResponse;

  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_BASE_URL}/api/auth/session`,
      {
        method: "GET",
        headers: {
          Cookie: `token=${token}`,
        },
        cache: "no-store",
      },
    );

    backendSession = await response.json();
  } catch {
    return NextResponse.json<MeResponse>(
      {
        authorized: false,
        user: null,
      },
      { status: 503 },
    );
  }

  if (!backendSession.authorized) {
    const response = NextResponse.json<MeResponse>(
      {
        authorized: false,
        user: null,
      },
      { status: 401 },
    );

    response.cookies.delete("token");
    response.cookies.delete("user");

    return response;
  }

  if (!userCookie) {
    return NextResponse.json<MeResponse>(
      {
        authorized: false,
        user: null,
      },
      { status: 401 },
    );
  }

  let user: User;

  try {
    user = JSON.parse(decodeURIComponent(userCookie));
  } catch {
    return NextResponse.json<MeResponse>(
      {
        authorized: false,
        user: null,
      },
      { status: 401 },
    );
  }

  if (backendSession.session?.id && backendSession.session.id !== user.id) {
    const response = NextResponse.json<MeResponse>(
      {
        authorized: false,
        user: null,
      },
      { status: 401 },
    );

    response.cookies.delete("token");
    response.cookies.delete("user");

    return response;
  }

  return NextResponse.json<MeResponse>({
    authorized: true,
    user,
  });
}
