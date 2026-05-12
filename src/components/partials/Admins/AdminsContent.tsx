"use client";

import { useState, useMemo } from "react";
import { Plus, Search, MoreVertical, Edit, Trash2, Shield, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { mockAdmins, mockTitles } from "@/data/mockData";
import { TEXT_LABEL, TEXT_BUTTON } from "@/constant/text";
import { ADMINS_CONFIG } from "./Admins.config";
import { AdminCreateDialog } from "./AdminCreateDialog";
import type { Admin } from "@/types/app";
import { DataTable } from "@/components/common/DataTable";
import type { DataTableColumn } from "@/components/common/DataTable";

const ROLE_OPTIONS = [
  { value: "all", label: "ทั้งหมด" },
  { value: "super_admin", label: "Super Admin" },
  { value: "org_admin", label: "Admin หน่วยงาน" },
];

function getTitleName(titleId?: string) {
  if (!titleId) return "";
  return mockTitles.find((t) => t.id === titleId)?.name ?? "";
}

function roleBadge(role: string) {
  if (role === "super_admin") return <Badge className="gap-1"><ShieldCheck className="w-3 h-3" /> Super Admin</Badge>;
  return <Badge variant="secondary" className="gap-1"><Shield className="w-3 h-3" /> Admin หน่วยงาน</Badge>;
}

export function AdminsContent() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  const filtered = mockAdmins.filter((a) => {
    const matchSearch =
      a.username.toLowerCase().includes(search.toLowerCase()) ||
      a.fullName.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || a.role === roleFilter;
    return matchSearch && matchRole;
  });

  const columns = useMemo<DataTableColumn<Admin>[]>(() => [
    {
      key: "username", title: "ชื่อผู้ใช้", dataIndex: "username",
      sortable: true, width: 140,
      render: (val: string) => <span className="font-mono text-sm text-slate-900">{val}</span>,
    },
    {
      key: "fullName", title: "ชื่อ-นามสกุล", dataIndex: "fullName",
      sortable: true,
      render: (val: string, record: Admin) => (
        <p className="font-medium text-slate-900">{getTitleName(record.titleId)}{val}</p>
      ),
    },
    {
      key: "email", title: "อีเมล", dataIndex: "email",
      sortable: true,
      render: (val: string) => <span className="text-sm text-slate-600">{val}</span>,
    },
    {
      key: "role", title: "บทบาท", dataIndex: "role",
      sortable: true, width: 140,
      render: (val: string) => roleBadge(val),
    },
    {
      key: "organizationName", title: "หน่วยงาน", dataIndex: "organizationName",
      render: (val: string | undefined) => <span className="text-sm text-slate-600">{val || "-"}</span>,
    },
    {
      key: "mfaEnabled", title: "MFA", dataIndex: "mfaEnabled",
      align: "center", width: 70,
      render: (val: boolean) => <Switch checked={val} disabled />,
    },
    {
      key: "lastLogin", title: "เข้าสู่ระบบล่าสุด", dataIndex: "lastLogin",
      sortable: true, width: 160,
      render: (val: string) => (
        <span className="text-sm text-slate-600">
          {new Date(val).toLocaleString("th-TH", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
        </span>
      ),
    },
    {
      key: "status", title: "สถานะ", dataIndex: "status",
      sortable: true, width: 100,
      render: (val: string) => (
        <Badge variant={val === "active" ? "success" : "destructive"}>
          {val === "active" ? TEXT_LABEL.STATUS_ACTIVE : TEXT_LABEL.STATUS_INACTIVE}
        </Badge>
      ),
    },
    {
      key: "actions", title: "", align: "center", width: 60,
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> {TEXT_BUTTON.EDIT}</DropdownMenuItem>
            <DropdownMenuItem><Shield className="w-4 h-4 mr-2" /> จัดการสิทธิ์</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600"><Trash2 className="w-4 h-4 mr-2" /> {TEXT_BUTTON.DELETE}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{ADMINS_CONFIG.title}</h1>
          <p className="text-slate-600">{ADMINS_CONFIG.description}</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="w-4 h-4 mr-2" /> เพิ่มผู้ดูแลระบบ
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="ค้นหาผู้ดูแลระบบ (ชื่อผู้ใช้, ชื่อ-นามสกุล, อีเมล)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="บทบาท" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>รายการผู้ดูแลระบบ ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable<Admin>
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

      <AdminCreateDialog open={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  );
}
