"use client";

import { Bell, LogOut, ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div />
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-md hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5 text-slate-500" />
        </button>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">
              <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-xs font-semibold text-indigo-700">
                  {session?.user?.name?.[0] ?? "A"}
                </span>
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-sm font-medium text-slate-900">{session?.user?.name ?? "Admin"}</span>
                <span className="text-xs text-slate-400">{(session?.user as any)?.role === "super_admin" ? "Super Admin" : "Org Admin"}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[180px] rounded-md border border-slate-200 bg-white p-1 shadow-md z-50"
              sideOffset={5}
              align="end"
            >
              <DropdownMenu.Item
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-md cursor-pointer hover:bg-red-50 outline-none"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="w-4 h-4" />
                ออกจากระบบ
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
