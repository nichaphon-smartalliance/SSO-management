"use client";

import { useState } from "react";
import { Plus, Search, MoreVertical, Eye, Edit, RefreshCw, Trash2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { mockClients, mockOrganizations } from "@/data/mockData";
import { TEXT_LABEL, TEXT_BUTTON } from "@/constant/text";
import { CLIENTS_CONFIG, CLIENT_STATUS_OPTIONS } from "./Clients.config";
import { ClientCreateDialog } from "./ClientCreateDialog";
import { ClientDetailDialog } from "./ClientDetailDialog";
import type { Client } from "@/types/app";

function statusBadge(status: string) {
  if (status === "active") return <Badge variant="success">ใช้งาน</Badge>;
  if (status === "expired") return <Badge variant="destructive">หมดอายุ</Badge>;
  return <Badge variant="secondary">ไม่ใช้งาน</Badge>;
}

export function ClientsContent() {
  const [search, setSearch] = useState("");
  const [orgFilter, setOrgFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filtered = mockClients.filter((c) => {
    const matchSearch =
      c.clientName.toLowerCase().includes(search.toLowerCase()) ||
      c.clientId.toLowerCase().includes(search.toLowerCase());
    const matchOrg = orgFilter === "all" || c.organizationId === orgFilter;
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchOrg && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{CLIENTS_CONFIG.title}</h1>
          <p className="text-slate-600 mt-1">{CLIENTS_CONFIG.description}</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="w-4 h-4 mr-2" /> เพิ่มระบบงานใหม่
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="ค้นหาระบบงาน (Client ID, ชื่อระบบ)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={orgFilter} onValueChange={setOrgFilter}>
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="หน่วยงาน" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">หน่วยงานทั้งหมด</SelectItem>
                {mockOrganizations.map((o) => (
                  <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="สถานะ" />
              </SelectTrigger>
              <SelectContent>
                {CLIENT_STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>รายการระบบงาน ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Client ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ชื่อระบบ</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">หน่วยงาน</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">วันที่มีผล</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">วันหมดอายุ</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ใช้งานล่าสุด</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">สถานะ</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="py-12 text-center text-slate-400 text-sm">{TEXT_LABEL.NO_DATA}</td></tr>
                ) : filtered.map((client) => {
                  const isExpiring = new Date(client.expiryDate) <= new Date("2026-04-30");
                  return (
                    <tr key={client.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono text-sm text-slate-900">{client.clientId}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-start gap-2">
                          <p className="font-medium text-slate-900">{client.clientName}</p>
                          {isExpiring && client.status !== "expired" && (
                            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">{client.organizationName}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">
                        {new Date(client.effectiveDate).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={isExpiring ? "text-red-600 font-medium" : "text-slate-600"}>
                          {new Date(client.expiryDate).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">
                        {client.lastUsed ? new Date(client.lastUsed).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" }) : "-"}
                      </td>
                      <td className="py-3 px-4">{statusBadge(client.status)}</td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedClient(client)}>
                              <Eye className="w-4 h-4 mr-2" /> ดูรายละเอียด
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" /> {TEXT_BUTTON.EDIT}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="w-4 h-4 mr-2" /> หมุนเวียน Secret
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" /> {TEXT_BUTTON.DELETE}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <ClientCreateDialog open={showCreate} onClose={() => setShowCreate(false)} />
      <ClientDetailDialog client={selectedClient} open={!!selectedClient} onClose={() => setSelectedClient(null)} />
    </div>
  );
}
