"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { mockOrganizations } from "@/data/mockData";
import { TEXT_LABEL } from "@/constant/text";
import { OrganizationsHeader } from "./OrganizationsHeader";
import { ORG_STATUS_OPTIONS } from "./Organizations.config";

export function OrganizationsContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockOrganizations.filter((o) => {
    const matchSearch =
      o.name.includes(search) ||
      o.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      o.code.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusBadge = (status: string) => {
    if (status === "active") return <Badge variant="success">{TEXT_LABEL.STATUS_ACTIVE}</Badge>;
    if (status === "suspended") return <Badge variant="destructive">ระงับ</Badge>;
    return <Badge variant="secondary">{TEXT_LABEL.STATUS_INACTIVE}</Badge>;
  };

  return (
    <div className="space-y-6">
      <OrganizationsHeader />

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="ค้นหาหน่วยงาน..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {ORG_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
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
                    <td className="px-6 py-4">{statusBadge(org.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">{TEXT_LABEL.NO_DATA}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
