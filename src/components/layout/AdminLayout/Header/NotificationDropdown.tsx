"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import {
  Bell, FileText, User, Key, ShieldAlert, Settings,
  CheckCheck, X,
} from "lucide-react";
import { mockNotifications } from "@/data/mockData";
import type { Notification, NotificationType } from "@/data/mockData";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min  = Math.floor(diff / 60_000);
  const hr   = Math.floor(diff / 3_600_000);
  const day  = Math.floor(diff / 86_400_000);
  if (min < 1)  return "เมื่อกี้";
  if (min < 60) return `${min} นาทีที่แล้ว`;
  if (hr  < 24) return `${hr} ชั่วโมงที่แล้ว`;
  if (day < 7)  return `${day} วันที่แล้ว`;
  return new Date(iso).toLocaleDateString("th-TH", { day: "numeric", month: "short" });
}

const TYPE_CONFIG: Record<NotificationType, { icon: React.ElementType; bg: string; color: string }> = {
  request:  { icon: FileText,    bg: "bg-blue-100",   color: "text-blue-600"   },
  user:     { icon: User,        bg: "bg-green-100",  color: "text-green-600"  },
  client:   { icon: Key,         bg: "bg-amber-100",  color: "text-amber-600"  },
  security: { icon: ShieldAlert, bg: "bg-red-100",    color: "text-red-600"    },
  system:   { icon: Settings,    bg: "bg-slate-100",  color: "text-slate-600"  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const dismiss = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="การแจ้งเตือน"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold px-1 leading-none">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          className="w-[380px] rounded-xl border border-slate-200 bg-white shadow-xl z-50 animate-in fade-in-0 zoom-in-95"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-900">การแจ้งเตือน</h3>
              {unreadCount > 0 && (
                <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  {unreadCount} ใหม่
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                อ่านทั้งหมด
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[420px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <Bell className="w-8 h-8 mb-2 opacity-40" />
                <p className="text-sm">ไม่มีการแจ้งเตือน</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-50">
                {notifications.map((notif) => {
                  const cfg = TYPE_CONFIG[notif.type];
                  const Icon = cfg.icon;
                  return (
                    <li
                      key={notif.id}
                      className={`relative flex gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer group ${!notif.read ? "bg-blue-50/40" : ""}`}
                      onClick={() => markRead(notif.id)}
                    >
                      {/* Unread dot */}
                      {!notif.read && (
                        <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500" />
                      )}

                      {/* Type icon */}
                      <div className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full ${cfg.bg}`}>
                        <Icon className={`w-4 h-4 ${cfg.color}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-snug ${!notif.read ? "font-semibold text-slate-900" : "font-medium text-slate-700"}`}>
                          {notif.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                          {notif.message}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">{timeAgo(notif.timestamp)}</p>
                      </div>

                      {/* Dismiss button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); dismiss(notif.id); }}
                        className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-200 transition-all self-start mt-0.5"
                        aria-label="ปิดการแจ้งเตือน"
                      >
                        <X className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2.5 border-t border-slate-100 text-center">
              <button
                className="text-xs text-slate-500 hover:text-slate-900 transition-colors"
                onClick={() => setOpen(false)}
              >
                ดูการแจ้งเตือนทั้งหมด
              </button>
            </div>
          )}

          <Popover.Arrow className="fill-white drop-shadow-sm" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
