import AppShell from "@/components/layout/AppShell";
import LoginForm from "@/components/login/LoginForm";

export const metadata = {
  title: "Student Login | Library Management System",
  description:
    "Log in as a student to borrow books and manage library activities",
};

export default function LoginPage() {
  return (
    <AppShell maxWidth="md">
      <LoginForm />
    </AppShell>
  );
}
