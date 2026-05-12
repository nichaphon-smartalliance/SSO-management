"use client";

import { useState, useMemo } from "react";
import { Plus, Search, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { mockOrganizations } from "@/data/mockData";
import { TEXT_BUTTON, TEXT_LABEL } from "@/constant/text";
import { ORGANIZATIONS_CONFIG, ORG_STATUS_OPTIONS } from "./Organizations.config";
import { OrganizationCreateDialog } from "./OrganizationCreateDialog";
import { OrganizationDetailDialog } from "./OrganizationDetailDialog";
import type { Organization } from "@/types/app";
import { DataTable } from "@/components/common/DataTable";
import type { DataTableColumn } from "@/components/common/DataTable";

function statusBadge(status: string) {
  if (status === "active") return <Badge variant="success">{TEXT_LABEL.STATUS_ACTIVE}</Badge>;
  if (status === "suspended") return <Badge variant="destructive">ระงับ</Badge>;
  return <Badge variant="secondary">{TEXT_LABEL.STATUS_INACTIVE}</Badge>;
}

export function OrganizationsContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  const filtered = mockOrganizations.filter((o) => {
    const matchSearch =
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      o.code.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns = useMemo<DataTableColumn<Organization>[]>(() => [
    {
      key: "code", title: "รหัสหน่วยงาน", dataIndex: "code",
      sortable: true, width: 120,
      render: (val: string) => <span className="font-mono text-sm text-slate-900">{val}</span>,
    },
    {
      key: "name", title: "ชื่อหน่วยงาน", dataIndex: "name",
      sortable: true,
      render: (val: string, record: Organization) => (
        <div>
          <p className="font-medium text-slate-900">{val}</p>
          <p className="text-xs text-slate-500">{record.nameEn}</p>
        </div>
      ),
    },
    {
      key: "type", title: "ประเภท", dataIndex: "type",
      render: (val: string) => <span className="text-sm text-slate-600">{val}</span>,
    },
    {
      key: "contactPerson", title: "ผู้ติดต่อ", dataIndex: "contactPerson",
      render: (val: string, record: Organization) => (
        <div>
          <p className="text-sm text-slate-900">{val}</p>
          <p className="text-xs text-slate-500">{record.email}</p>
        </div>
      ),
    },
    {
      key: "clientCount", title: "ระบบงาน", dataIndex: "clientCount",
      sortable: true, align: "center", width: 90,
      render: (val: number) => <span className="text-sm text-slate-900">{val}</span>,
    },
    {
      key: "userCount", title: "ผู้ใช้งาน", dataIndex: "userCount",
      sortable: true, align: "center", width: 100,
      render: (val: number) => <span className="text-sm text-slate-900">{val.toLocaleString()}</span>,
    },
    {
      key: "status", title: "สถานะ", dataIndex: "status",
      sortable: true, width: 100,
      render: (val: string) => statusBadge(val),
    },
    {
      key: "actions", title: "", align: "center", width: 60,
      render: (_: unknown, record: Organization) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedOrg(record)}>
              <Eye className="w-4 h-4 mr-2" /> ดูรายละเอียด
            </DropdownMenuItem>
            <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> {TEXT_BUTTON.EDIT}</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600"><Trash2 className="w-4 h-4 mr-2" /> {TEXT_BUTTON.DELETE}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [setSelectedOrg]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{ORGANIZATIONS_CONFIG.title}</h1>
          <p className="text-slate-600">{ORGANIZATIONS_CONFIG.description}</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="w-4 h-4 mr-2" /> เพิ่มหน่วยงานใหม่
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="ค้นหาหน่วยงาน (ชื่อ, รหัส)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="สถานะ" />
              </SelectTrigger>
              <SelectContent>
                {ORG_STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการหน่วยงาน ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable<Organization>
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

      <OrganizationCreateDialog open={showCreate} onClose={() => setShowCreate(false)} />
      <OrganizationDetailDialog org={selectedOrg} open={!!selectedOrg} onClose={() => setSelectedOrg(null)} />
    </div>
  );
}
