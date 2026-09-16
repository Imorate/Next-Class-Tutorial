import { getCurrentSession } from "@/features/auth/auth-current-session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const sessionId = await getCurrentSession();
  if (!sessionId) {
    redirect("/login");
  }
  return <div>{sessionId}</div>;
}
