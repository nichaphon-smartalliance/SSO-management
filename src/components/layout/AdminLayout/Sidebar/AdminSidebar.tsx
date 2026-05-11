"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenuItems, SIDEBAR_STYLE } from "./Sidebar.config";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="min-h-[calc(100vh-4rem)] border-r"
      style={{
        width: SIDEBAR_STYLE.width,
        background: SIDEBAR_STYLE.background,
        borderColor: SIDEBAR_STYLE.borderColor,
      }}
    >
      <nav className="p-4 space-y-1">
        {sidebarMenuItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.key}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
              style={{
                background: active ? SIDEBAR_STYLE.activeItemBg : "transparent",
                color: active ? SIDEBAR_STYLE.activeItemColor : SIDEBAR_STYLE.itemColor,
                fontWeight: active ? 500 : 400,
              }}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
