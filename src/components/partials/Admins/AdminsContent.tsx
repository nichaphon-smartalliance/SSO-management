"use client";

import { useState } from "react";
import { Plus, Search, MoreVertical, Edit, Trash2, Shield, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { mockAdmins, mockTitles } from "@/data/mockData";
import { TEXT_LABEL, TEXT_BUTTON } from "@/constant/text";
import { ADMINS_CONFIG } from "./Admins.config";
import { AdminCreateDialog } from "./AdminCreateDialog";
import type { Admin } from "@/types/app";

const ROLE_OPTIONS = [
  { value: "all", label: "ทั้งหมด" },
  { value: "super_admin", label: "Super Admin" },
  { value: "org_admin", label: "Admin หน่วยงาน" },
];

function getTitleName(titleId?: string) {
  if (!titleId) return "";
  return mockTitles.find((t) => t.id === titleId)?.name ?? "";
}

function roleBadge(role: string) {
  if (role === "super_admin") return <Badge className="gap-1"><ShieldCheck className="w-3 h-3" /> Super Admin</Badge>;
  return <Badge variant="secondary" className="gap-1"><Shield className="w-3 h-3" /> Admin หน่วยงาน</Badge>;
}

export function AdminsContent() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showCreate, setShowCreate] = useState(false);

  const filtered = mockAdmins.filter((a) => {
    const matchSearch =
      a.username.toLowerCase().includes(search.toLowerCase()) ||
      a.fullName.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || a.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{ADMINS_CONFIG.title}</h1>
          <p className="text-slate-600">{ADMINS_CONFIG.description}</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="w-4 h-4 mr-2" /> เพิ่มผู้ดูแลระบบ
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="ค้นหาผู้ดูแลระบบ (ชื่อผู้ใช้, ชื่อ-นามสกุล, อีเมล)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="บทบาท" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>รายการผู้ดูแลระบบ ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ชื่อผู้ใช้</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ชื่อ-นามสกุล</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">อีเมล</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">บทบาท</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">หน่วยงาน</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-slate-600">MFA</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">เข้าสู่ระบบล่าสุด</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">สถานะ</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} className="py-12 text-center text-slate-400 text-sm">{TEXT_LABEL.NO_DATA}</td></tr>
                ) : filtered.map((admin) => (
                  <tr key={admin.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono text-sm text-slate-900">{admin.username}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {getTitleName(admin.titleId)}{admin.fullName}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{admin.email}</td>
                    <td className="py-3 px-4">{roleBadge(admin.role)}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{admin.organizationName || "-"}</td>
                    <td className="py-3 px-4 text-center">
                      <Switch checked={admin.mfaEnabled} disabled />
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">
                      {new Date(admin.lastLogin).toLocaleString("th-TH", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={admin.status === "active" ? "success" : "destructive"}>
                        {admin.status === "active" ? TEXT_LABEL.STATUS_ACTIVE : TEXT_LABEL.STATUS_INACTIVE}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" /> {TEXT_BUTTON.EDIT}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="w-4 h-4 mr-2" /> จัดการสิทธิ์
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" /> {TEXT_BUTTON.DELETE}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AdminCreateDialog open={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  );
}
