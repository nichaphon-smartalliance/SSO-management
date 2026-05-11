"use client";

import { useState } from "react";
import { Plus, Search, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { mockUsers } from "@/data/mockData";
import { format } from "date-fns";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockUsers.filter((u) => {
    const matchSearch =
      u.fullName.includes(search) ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusBadge = (status: string) => {
    if (status === "active") return <Badge variant="success">ใช้งาน</Badge>;
    if (status === "locked") return <Badge variant="destructive">ถูกล็อค</Badge>;
    return <Badge variant="secondary">ไม่ใช้งาน</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">จัดการผู้ใช้งาน</h1>
          <p className="text-sm text-slate-500 mt-1">จัดการบัญชีผู้ใช้งานทั้งหมดในระบบ</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" /> เพิ่มผู้ใช้งาน
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="ค้นหาผู้ใช้งาน..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select
              className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="active">ใช้งาน</option>
              <option value="inactive">ไม่ใช้งาน</option>
              <option value="locked">ถูกล็อค</option>
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
                  <th className="text-left px-6 py-3 font-medium text-slate-600">หน่วยงาน</th>
                  <th className="text-center px-6 py-3 font-medium text-slate-600">ThaID</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">เข้าสู่ระบบล่าสุด</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-700">{user.username}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{user.fullName}</td>
                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                    <td className="px-6 py-4 text-slate-600">{user.organizationName}</td>
                    <td className="px-6 py-4 text-center">
                      {user.thaidLinked
                        ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                        : <XCircle className="w-4 h-4 text-slate-300 mx-auto" />}
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs">
                      {format(new Date(user.lastLogin), "dd/MM/yyyy HH:mm")}
                    </td>
                    <td className="px-6 py-4">{statusBadge(user.status)}</td>
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
