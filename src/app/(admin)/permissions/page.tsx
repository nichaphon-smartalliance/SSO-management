"use client";

import { useState } from "react";
import { Search, Shield, Clock, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockPermissions } from "@/data/mockData";
import { format } from "date-fns";

export default function PermissionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockPermissions.filter((p) => {
    const matchSearch =
      p.userName.includes(search) ||
      p.clientName.includes(search) ||
      p.organizationName.includes(search);
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statCards = [
    { label: "สิทธิ์ที่ใช้งาน", value: mockPermissions.filter((p) => p.status === "active").length, icon: Shield, color: "text-green-600", bg: "bg-green-50" },
    { label: "สิทธิ์ที่หมดอายุ", value: mockPermissions.filter((p) => p.status === "expired").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "สิทธิ์ที่ถูกเพิกถอน", value: mockPermissions.filter((p) => p.status === "revoked").length, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">สิทธิ์การเข้าถึง</h1>
        <p className="text-sm text-slate-500 mt-1">จัดการสิทธิ์การเข้าถึงระบบงานของผู้ใช้</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{s.label}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{s.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${s.bg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="ค้นหาสิทธิ์..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select
              className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="active">ใช้งาน</option>
              <option value="expired">หมดอายุ</option>
              <option value="revoked">ถูกเพิกถอน</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-6 py-3 font-medium text-slate-600">ผู้ใช้งาน</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">ระบบงาน</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">หน่วยงาน</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">บทบาท</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">วันเริ่ม</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">วันหมดอายุ</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">สถานะ</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{p.userName}</td>
                    <td className="px-6 py-4 text-slate-600">{p.clientName}</td>
                    <td className="px-6 py-4 text-slate-600">{p.organizationName}</td>
                    <td className="px-6 py-4 text-slate-600">{p.role}</td>
                    <td className="px-6 py-4 text-slate-600 text-xs">{format(new Date(p.effectiveDate), "dd/MM/yyyy")}</td>
                    <td className="px-6 py-4 text-slate-600 text-xs">{format(new Date(p.expiryDate), "dd/MM/yyyy")}</td>
                    <td className="px-6 py-4">
                      <Badge variant={p.status === "active" ? "success" : p.status === "expired" ? "warning" : "destructive"}>
                        {p.status === "active" ? "ใช้งาน" : p.status === "expired" ? "หมดอายุ" : "ถูกเพิกถอน"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {p.status === "active" && (
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">เพิกถอน</Button>
                      )}
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
