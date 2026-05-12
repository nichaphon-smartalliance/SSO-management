"use client";

import { useState, useMemo } from "react";
import { Plus, Search, Shield, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { mockPermissions, mockUsers, mockClients, mockOrganizations } from "@/data/mockData";
import { TEXT_LABEL } from "@/constant/text";
import { PERMISSIONS_CONFIG, PERMISSION_STATUS_OPTIONS, PERMISSION_STAT_CARDS } from "./Permissions.config";
import type { Permission } from "@/types/app";
import { DataTable } from "@/components/common/DataTable";
import type { DataTableColumn } from "@/components/common/DataTable";

function statusBadge(status: string) {
  if (status === "active") return <Badge variant="success">ใช้งาน</Badge>;
  if (status === "expired") return <Badge variant="secondary">หมดอายุ</Badge>;
  return <Badge variant="destructive">ถูกเพิกถอน</Badge>;
}

export function PermissionsContent() {
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [clientFilter, setClientFilter] = useState("all");
  const [orgFilter, setOrgFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  const filtered = mockPermissions.filter((p) => {
    const matchSearch =
      p.userName.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase()) ||
      p.organizationName.toLowerCase().includes(search.toLowerCase());
    const matchUser = userFilter === "all" || p.userId === userFilter;
    const matchClient = clientFilter === "all" || p.clientId === clientFilter;
    const matchOrg = orgFilter === "all" || p.organizationId === orgFilter;
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchUser && matchClient && matchOrg && matchStatus;
  });

  const columns = useMemo<DataTableColumn<Permission>[]>(() => [
    {
      key: "userName", title: "ผู้ใช้งาน", dataIndex: "userName",
      sortable: true,
      render: (val: string) => <p className="font-medium text-slate-900">{val}</p>,
    },
    {
      key: "clientName", title: "ระบบงาน", dataIndex: "clientName",
      sortable: true,
      render: (val: string, record: Permission) => (
        <div>
          <p className="text-sm text-slate-900">{val}</p>
          <p className="text-xs text-slate-400 font-mono">{record.clientId}</p>
        </div>
      ),
    },
    {
      key: "organizationName", title: "หน่วยงาน", dataIndex: "organizationName",
      render: (val: string) => <span className="text-sm text-slate-600">{val}</span>,
    },
    {
      key: "role", title: "บทบาท", dataIndex: "role",
      width: 130,
      render: (val: string) => (
        <Badge variant="outline" className="gap-1">
          <Shield className="w-3 h-3" /> {val}
        </Badge>
      ),
    },
    {
      key: "scopes", title: "Scopes", dataIndex: "scopes",
      render: (val: string[]) => (
        <div className="flex flex-wrap gap-1">
          {val.slice(0, 2).map((scope, i) => (
            <Badge key={i} variant="secondary" className="text-xs">{scope}</Badge>
          ))}
          {val.length > 2 && (
            <Badge variant="secondary" className="text-xs">+{val.length - 2}</Badge>
          )}
        </div>
      ),
    },
    {
      key: "effectiveDate", title: "วันที่มีผล", dataIndex: "effectiveDate",
      sortable: true, width: 120,
      render: (val: string) => (
        <span className="text-sm text-slate-600">
          {new Date(val).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
        </span>
      ),
    },
    {
      key: "expiryDate", title: "วันหมดอายุ", dataIndex: "expiryDate",
      sortable: true, width: 120,
      render: (val: string) => (
        <span className="text-sm text-slate-600">
          {new Date(val).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
        </span>
      ),
    },
    {
      key: "status", title: "สถานะ", dataIndex: "status",
      sortable: true, width: 110,
      render: (val: string) => statusBadge(val),
    },
    {
      key: "actions", title: "", align: "center", width: 80,
      render: (_: unknown, record: Permission) =>
        record.status === "active" ? (
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <X className="w-4 h-4 mr-1" /> เพิกถอน
          </Button>
        ) : null,
    },
  ], []);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{PERMISSIONS_CONFIG.title}</h1>
          <p className="text-slate-600">{PERMISSIONS_CONFIG.description}</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> มอบสิทธิ์การเข้าถึง
        </Button>
      </div>


      {/* Filter Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="ค้นหา (ชื่อผู้ใช้, ระบบงาน)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger><SelectValue placeholder="ผู้ใช้งาน" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                {mockUsers.slice(0, 10).map((u) => (
                  <SelectItem key={u.id} value={u.id}>{u.fullName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={clientFilter} onValueChange={setClientFilter}>
              <SelectTrigger><SelectValue placeholder="ระบบงาน" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                {mockClients.map((c) => (
                  <SelectItem key={c.id} value={c.clientId}>{c.clientName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={orgFilter} onValueChange={setOrgFilter}>
              <SelectTrigger><SelectValue placeholder="หน่วยงาน" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                {mockOrganizations.map((o) => (
                  <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger><SelectValue placeholder="สถานะ" /></SelectTrigger>
              <SelectContent>
                {PERMISSION_STATUS_OPTIONS.map((opt) => (
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
          <CardTitle>สิทธิ์การเข้าถึงระบบ ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable<Permission>
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

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PERMISSION_STAT_CARDS.map((s) => {
          // const Icon = s.icon;
          const count = mockPermissions.filter((p) => p.status === s.key).length;
          return (
            <Card key={s.key}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{s.label}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{count}</p>
                  </div>
                  {/* <div className={`w-12 h-12 rounded-lg ${s.bg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${s.color}`} />
                  </div> */}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

    </div>
  );
}
