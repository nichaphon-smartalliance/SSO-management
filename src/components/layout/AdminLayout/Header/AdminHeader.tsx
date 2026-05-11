"use client";

import { Bell, User, ChevronDown, LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HEADER_LOGO_CONFIG, HEADER_ROLE_LABEL, HEADER_STYLE } from "./Header.config";
import { TEXT_BUTTON } from "@/constant/text";

export function AdminHeader() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role as string | undefined;
  const isSuperAdmin = role === "super_admin";
  const roleLabel = HEADER_ROLE_LABEL[role ?? ""] ?? "Admin";
  const LogoIcon = HEADER_LOGO_CONFIG.logoIcon;

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{ background: HEADER_STYLE.background, borderColor: HEADER_STYLE.borderColor }}
    >
      <div className="flex items-center justify-between px-6" style={{ height: HEADER_STYLE.height }}>
        {/* Left — logo + title */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
            style={{ background: HEADER_STYLE.logoIconBg }}
          >
            <LogoIcon className="w-6 h-6" style={{ color: HEADER_STYLE.logoIconColor }} />
          </div>
          <div>
            <h1 className="text-base font-semibold leading-tight" style={{ color: HEADER_STYLE.titleColor }}>
              {HEADER_LOGO_CONFIG.title}
            </h1>
            <p className="text-xs" style={{ color: HEADER_STYLE.subtitleColor }}>
              {HEADER_LOGO_CONFIG.subtitle}
            </p>
          </div>
        </div>

        {/* Right — bell + user dropdown */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ background: HEADER_STYLE.bellActiveColor }}
            />
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
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: isSuperAdmin ? HEADER_STYLE.superAdminBadgeBg : HEADER_STYLE.orgAdminBadgeBg,
                        color: isSuperAdmin ? HEADER_STYLE.superAdminBadgeColor : HEADER_STYLE.orgAdminBadgeColor,
                      }}
                    >
                      {roleLabel}
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
                  {TEXT_BUTTON.LOGOUT}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  );
}
