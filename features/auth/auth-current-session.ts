import { SessionResponse } from "@/features/auth/auth.type";
import { cookies } from "next/headers";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

if (!NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getCurrentSession(): Promise<string | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
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

    if (!session.authorized || !session.session) {
      return null;
    }

    return session.session?.id;
  } catch {
    return null;
  }
}
