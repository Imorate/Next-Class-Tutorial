import { getCurrentSession } from "@/features/auth/auth-current-user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const userId = await getCurrentSession();
  if (!userId) {
    redirect("/login");
  }
  return <div>{userId}</div>;
}
