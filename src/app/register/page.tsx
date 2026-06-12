import AppShell from "@/components/layout/AppShell";
import RegistrationForm from "@/components/registration/RegistrationForm";

export const metadata = {
  title: "Student Registration | Library Management System",
  description:
    "Register as a student to borrow books and manage library activities",
};

export default function RegisterPage() {
  return (
    <AppShell maxWidth="md">
      <RegistrationForm />
    </AppShell>
  );
}
