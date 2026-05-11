"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { mockOrganizations } from "@/data/mockData";

export default function OrganizationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockOrganizations.filter((o) => {
    const matchSearch = o.name.includes(search) || o.nameEn.toLowerCase().includes(search.toLowerCase()) || o.code.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">จัดการหน่วยงาน</h1>
          <p className="text-sm text-slate-500 mt-1">จัดการข้อมูลหน่วยงานราชการทั้งหมด</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" /> เพิ่มหน่วยงาน
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="ค้นหาหน่วยงาน..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select
              className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="active">ใช้งาน</option>
              <option value="inactive">ไม่ใช้งาน</option>
              <option value="suspended">ระงับ</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-6 py-3 font-medium text-slate-600">รหัส</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">ชื่อหน่วยงาน</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">ประเภท</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">ผู้ติดต่อ</th>
                  <th className="text-center px-6 py-3 font-medium text-slate-600">ระบบงาน</th>
                  <th className="text-center px-6 py-3 font-medium text-slate-600">ผู้ใช้</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((org) => (
                  <tr key={org.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-medium text-indigo-600">{org.code}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{org.name}</p>
                      <p className="text-xs text-slate-400">{org.nameEn}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{org.type}</td>
                    <td className="px-6 py-4">
                      <p className="text-slate-900">{org.contactPerson}</p>
                      <p className="text-xs text-slate-400">{org.email}</p>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-slate-900">{org.clientCount}</td>
                    <td className="px-6 py-4 text-center font-semibold text-slate-900">{org.userCount}</td>
                    <td className="px-6 py-4">
                      <Badge variant={org.status === "active" ? "success" : org.status === "suspended" ? "destructive" : "secondary"}>
                        {org.status === "active" ? "ใช้งาน" : org.status === "suspended" ? "ระงับ" : "ไม่ใช้งาน"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">ไม่พบข้อมูล</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
