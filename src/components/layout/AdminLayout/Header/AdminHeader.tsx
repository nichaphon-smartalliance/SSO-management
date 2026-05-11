"use client";

import { Bell, User, ChevronDown, LogOut, Settings, Shield } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function AdminHeader() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;
  const isSuperAdmin = role === "super_admin";

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left — logo + title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-slate-900 leading-tight">
              ระบบการลงชื่อเข้าใช้ระบบสารสนเทศแบบครั้งเดียว สำหรับเจ้าหน้าที่
            </h1>
            <p className="text-xs text-slate-500">Single Sign - On Management</p>
          </div>
        </div>

        {/* Right — bell + user */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900">
                      {session?.user?.name ?? "Admin"}
                    </p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isSuperAdmin
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      {isSuperAdmin ? "Super Admin" : "Admin หน่วยงาน"}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[200px] rounded-md border border-slate-200 bg-white p-1 shadow-lg z-50"
                sideOffset={8}
                align="end"
              >
                <DropdownMenu.Label className="px-3 py-1.5 text-xs font-semibold text-slate-500">
                  บัญชีของฉัน
                </DropdownMenu.Label>
                <DropdownMenu.Separator className="my-1 h-px bg-slate-100" />
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 rounded-md cursor-pointer hover:bg-slate-50 outline-none">
                  <User className="w-4 h-4" />
                  ข้อมูลส่วนตัว
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 rounded-md cursor-pointer hover:bg-slate-50 outline-none">
                  <Settings className="w-4 h-4" />
                  การตั้งค่า
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-px bg-slate-100" />
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
      </div>
    </header>
  );
}
