import { SessionResponse, User } from "@/features/auth/auth.type";
import { cookies } from "next/headers";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

if (!NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const userCookie = cookieStore.get("user")?.value;

  if (!token || !userCookie) {
    return null;
  }

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

    if (!response.ok) {
      return null;
    }

    const session: SessionResponse = await response.json();

    if (!session.authorized) {
      return null;
    }

    const user: User = JSON.parse(decodeURIComponent(userCookie));

    if (session.session?.id && session.session.id !== user.id) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}
