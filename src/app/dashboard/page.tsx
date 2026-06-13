import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import AppShell from "@/components/layout/AppShell";
import DashboardView from "@/components/dashboard/DashboardView";

export const metadata = {
  title: "Student Dashboard | Library Management System",
  description: "View your student profile and manage library loans",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("library_session")?.value;

  if (!token) {
    redirect("/login");
  }

  const student = await verifyToken(token);
  if (!student) {
    redirect("/login");
  }

  return (
    <AppShell maxWidth="md">
      <DashboardView student={student} />
    </AppShell>
  );
}
