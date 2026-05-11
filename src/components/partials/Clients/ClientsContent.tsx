"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { mockClients } from "@/data/mockData";
import { format } from "date-fns";
import { TEXT_LABEL } from "@/constant/text";
import { ClientsHeader } from "./ClientsHeader";
import { CLIENT_STATUS_OPTIONS } from "./Clients.config";

export function ClientsContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockClients.filter((c) => {
    const matchSearch =
      c.clientName.includes(search) ||
      c.clientId.toLowerCase().includes(search.toLowerCase()) ||
      c.organizationName.includes(search);
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusBadge = (status: string) => {
    if (status === "active") return <Badge variant="success">{TEXT_LABEL.STATUS_ACTIVE}</Badge>;
    if (status === "expired") return <Badge variant="warning">{TEXT_LABEL.STATUS_EXPIRED}</Badge>;
    return <Badge variant="secondary">{TEXT_LABEL.STATUS_INACTIVE}</Badge>;
  };

  return (
    <div className="space-y-6">
      <ClientsHeader />

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="ค้นหาระบบงาน..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {CLIENT_STATUS_OPTIONS.map((opt) => (
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
                  <th className="text-left px-6 py-3 font-medium text-slate-600">Client ID</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">ชื่อระบบงาน</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">หน่วยงาน</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">วันที่เริ่มใช้</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">วันที่หมดอายุ</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">ใช้งานล่าสุด</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((client) => (
                  <tr key={client.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-indigo-600">{client.clientId}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{client.clientName}</td>
                    <td className="px-6 py-4 text-slate-600">{client.organizationName}</td>
                    <td className="px-6 py-4 text-slate-600 text-xs">{format(new Date(client.effectiveDate), "dd/MM/yyyy")}</td>
                    <td className="px-6 py-4 text-slate-600 text-xs">{format(new Date(client.expiryDate), "dd/MM/yyyy")}</td>
                    <td className="px-6 py-4 text-slate-600 text-xs">
                      {client.lastUsed ? format(new Date(client.lastUsed), "dd/MM/yyyy HH:mm") : "-"}
                    </td>
                    <td className="px-6 py-4">{statusBadge(client.status)}</td>
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
