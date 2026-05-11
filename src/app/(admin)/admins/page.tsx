"use client";

import { useState } from "react";
import { Plus, Search, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { mockAdmins } from "@/data/mockData";
import { format } from "date-fns";

export default function AdminsPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = mockAdmins.filter((a) => {
    const matchSearch =
      a.fullName.includes(search) ||
      a.username.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || a.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">จัดการผู้ดูแลระบบ</h1>
          <p className="text-sm text-slate-500 mt-1">จัดการบัญชีผู้ดูแลระบบ Super Admin และ Org Admin</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" /> เพิ่มผู้ดูแล
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="ค้นหาผู้ดูแลระบบ..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select
              className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">บทบาททั้งหมด</option>
              <option value="super_admin">Super Admin</option>
              <option value="org_admin">Org Admin</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-6 py-3 font-medium text-slate-600">ชื่อผู้ใช้</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">ชื่อ-นามสกุล</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">อีเมล</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">บทบาท</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">หน่วยงาน</th>
                  <th className="text-center px-6 py-3 font-medium text-slate-600">MFA</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">เข้าสู่ระบบล่าสุด</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((admin) => (
                  <tr key={admin.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-700">{admin.username}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{admin.fullName}</td>
                    <td className="px-6 py-4 text-slate-600">{admin.email}</td>
                    <td className="px-6 py-4">
                      <Badge variant={admin.role === "super_admin" ? "default" : "secondary"}>
                        {admin.role === "super_admin" ? "Super Admin" : "Org Admin"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{admin.organizationName ?? "-"}</td>
                    <td className="px-6 py-4 text-center">
                      <ShieldCheck className={`w-4 h-4 mx-auto ${admin.mfaEnabled ? "text-green-500" : "text-slate-300"}`} />
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs">
                      {format(new Date(admin.lastLogin), "dd/MM/yyyy HH:mm")}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={admin.status === "active" ? "success" : "secondary"}>
                        {admin.status === "active" ? "ใช้งาน" : "ไม่ใช้งาน"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-12 text-slate-400 text-sm">ไม่พบข้อมูล</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
