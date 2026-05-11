"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { mockPermissions } from "@/data/mockData";
import { TEXT_LABEL } from "@/constant/text";
import { PERMISSIONS_CONFIG, PERMISSION_STATUS_OPTIONS, PERMISSION_STAT_CARDS } from "./Permissions.config";

function statusBadge(status: string) {
  if (status === "active") return <Badge variant="success">{TEXT_LABEL.STATUS_ACTIVE}</Badge>;
  if (status === "expired") return <Badge variant="secondary">หมดอายุ</Badge>;
  return <Badge variant="destructive">ถูกเพิกถอน</Badge>;
}

export function PermissionsContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockPermissions.filter((p) => {
    const matchSearch =
      p.userName.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase()) ||
      p.organizationName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{PERMISSIONS_CONFIG.title}</h1>
        <p className="text-slate-600">{PERMISSIONS_CONFIG.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PERMISSION_STAT_CARDS.map((s) => {
          const Icon = s.icon;
          const value = mockPermissions.filter((p) => p.status === s.key).length;
          return (
            <Card key={s.key}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{s.label}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
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
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <CardTitle>รายการสิทธิ์การเข้าถึง ({filtered.length})</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="ค้นหาสิทธิ์..."
                  className="pl-9 w-full sm:w-64"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="สถานะ" />
                </SelectTrigger>
                <SelectContent>
                  {PERMISSION_STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="py-12 text-center text-slate-400 text-sm">{TEXT_LABEL.NO_DATA}</td></tr>
                ) : filtered.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{p.userName}</td>
                    <td className="px-6 py-4 text-slate-600">{p.clientName}</td>
                    <td className="px-6 py-4 text-slate-600">{p.organizationName}</td>
                    <td className="px-6 py-4 text-slate-600">{p.role}</td>
                    <td className="px-6 py-4 text-slate-600 text-xs">
                      {new Date(p.effectiveDate).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs">
                      {new Date(p.expiryDate).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
                    </td>
                    <td className="px-6 py-4">{statusBadge(p.status)}</td>
                    <td className="px-6 py-4">
                      {p.status === "active" && (
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">เพิกถอน</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
