


import DashboardLayout from "../components/DashboardLayout";
import AuthGuard from "../components/AuthGuard";

export default function DashboardRootLayout({ children }) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
