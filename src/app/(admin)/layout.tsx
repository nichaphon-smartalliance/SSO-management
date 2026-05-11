import { AdminLayout } from "@/components/layout/AdminLayout";
import { AuthGuard } from "@/context/auth";

export default function AdminRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AdminLayout>{children}</AdminLayout>
    </AuthGuard>
  );
}
