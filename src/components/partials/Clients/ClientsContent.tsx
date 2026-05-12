"use client";

import { useState, useMemo } from "react";
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
import { DataTable } from "@/components/common/DataTable";
import type { DataTableColumn } from "@/components/common/DataTable";

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
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  const filtered = mockClients.filter((c) => {
    const matchSearch =
      c.clientName.toLowerCase().includes(search.toLowerCase()) ||
      c.clientId.toLowerCase().includes(search.toLowerCase());
    const matchOrg = orgFilter === "all" || c.organizationId === orgFilter;
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchOrg && matchStatus;
  });

  const columns = useMemo<DataTableColumn<Client>[]>(() => [
    {
      key: "clientId", title: "Client ID", dataIndex: "clientId",
      sortable: true, width: 160,
      render: (val: string) => <span className="font-mono text-sm text-slate-900">{val}</span>,
    },
    {
      key: "clientName", title: "ชื่อระบบ", dataIndex: "clientName",
      sortable: true,
      render: (val: string, record: Client) => {
        const isExpiring = new Date(record.expiryDate) <= new Date("2026-04-30");
        return (
          <div className="flex items-start gap-2">
            <p className="font-medium text-slate-900">{val}</p>
            {isExpiring && record.status !== "expired" && (
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            )}
          </div>
        );
      },
    },
    {
      key: "organizationName", title: "หน่วยงาน", dataIndex: "organizationName",
      render: (val: string) => <span className="text-sm text-slate-600">{val}</span>,
    },
    {
      key: "effectiveDate", title: "วันที่มีผล", dataIndex: "effectiveDate",
      sortable: true, width: 130,
      render: (val: string) => (
        <span className="text-sm text-slate-600">
          {new Date(val).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
        </span>
      ),
    },
    {
      key: "expiryDate", title: "วันหมดอายุ", dataIndex: "expiryDate",
      sortable: true, width: 130,
      render: (val: string) => {
        const isExpiring = new Date(val) <= new Date("2026-04-30");
        return (
          <span className={`text-sm ${isExpiring ? "text-red-600 font-medium" : "text-slate-600"}`}>
            {new Date(val).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
          </span>
        );
      },
    },
    {
      key: "lastUsed", title: "ใช้งานล่าสุด", dataIndex: "lastUsed",
      sortable: true, width: 130,
      render: (val: string | undefined) => (
        <span className="text-sm text-slate-600">
          {val ? new Date(val).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" }) : "-"}
        </span>
      ),
    },
    {
      key: "status", title: "สถานะ", dataIndex: "status",
      sortable: true, width: 100,
      render: (val: string) => statusBadge(val),
    },
    {
      key: "actions", title: "", align: "center", width: 60,
      render: (_: unknown, record: Client) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedClient(record)}>
              <Eye className="w-4 h-4 mr-2" /> ดูรายละเอียด
            </DropdownMenuItem>
            <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> {TEXT_BUTTON.EDIT}</DropdownMenuItem>
            <DropdownMenuItem><RefreshCw className="w-4 h-4 mr-2" /> หมุนเวียน Secret</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600"><Trash2 className="w-4 h-4 mr-2" /> {TEXT_BUTTON.DELETE}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [setSelectedClient]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{CLIENTS_CONFIG.title}</h1>
          <p className="text-slate-600">{CLIENTS_CONFIG.description}</p>
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
                <SelectItem value="all">ทั้งหมด</SelectItem>
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
          <DataTable<Client>
            rowKey="id"
            columns={columns}
            dataSource={filtered}
            emptyText={TEXT_LABEL.NO_DATA}
            pagination={{
              current: currentPage,
              pageSize: PAGE_SIZE,
              total: filtered.length,
              showSizeChanger: false,
              showTotal: (total, range) => `${range[0]}-${range[1]} จาก ${total} รายการ`,
              onChange: (page) => setCurrentPage(page),
            }}
          />
        </CardContent>
      </Card>

      <ClientCreateDialog open={showCreate} onClose={() => setShowCreate(false)} />
      <ClientDetailDialog client={selectedClient} open={!!selectedClient} onClose={() => setSelectedClient(null)} />
    </div>
  );
}
