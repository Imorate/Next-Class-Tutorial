import { LoginResponse } from "@/features/auth/auth.type";
import { NextRequest, NextResponse } from "next/server";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const backendResponse = await fetch(
      `${NEXT_PUBLIC_API_BASE_URL}/api/auth/sign-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    const data: LoginResponse = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(data, { status: backendResponse.status });
    }
    console.log(backendResponse);
    const response = NextResponse.json({
      message: data.message,
      authorized: data.authorized,
      user: data.user,
    } as LoginResponse);

    const setCookie = backendResponse.headers.get("set-cookie");
    let expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    if (setCookie) {
      const expiresMatch = setCookie.match(/Expires=([^;]+)/i);
      if (expiresMatch) {
        expires = new Date(expiresMatch[1]);
      }
    }

    response.cookies.set({
      name: "token",
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expires,
    });

    response.cookies.set({
      name: "user",
      value: encodeURIComponent(JSON.stringify(data.user)),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "خطا در ارتباط با سرور",
      },
      { status: 500 },
    );
  }
}
