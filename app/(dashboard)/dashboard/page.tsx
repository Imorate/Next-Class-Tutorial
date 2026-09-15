import { getCurrentUser } from "@/features/auth/auth-current-user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return <div>{user?.email}</div>;
}
