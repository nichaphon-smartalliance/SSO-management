import { AdminSidebar } from "./Sidebar";
import { AdminHeader } from "./Header";
import { LAYOUT_CONFIG } from "./AdminLayout.config";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: LAYOUT_CONFIG.background }}>
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1" style={{ padding: LAYOUT_CONFIG.mainPadding }}>
          {children}
        </main>
      </div>
    </div>
  );
}
