"use client";

import { useState, useMemo } from "react";
import { Plus, Search, MoreVertical, Eye, Edit, Lock, Unlock, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { mockUsers, mockOrganizations, mockTitles } from "@/data/mockData";
import { TEXT_LABEL, TEXT_BUTTON } from "@/constant/text";
import { USERS_CONFIG, USER_STATUS_OPTIONS } from "./Users.config";
import { UserCreateDialog } from "./UserCreateDialog";
import { UserDetailDialog } from "./UserDetailDialog";
import type { User } from "@/types/app";
import { DataTable } from "@/components/common/DataTable";
import type { DataTableColumn } from "@/components/common/DataTable";

const THAID_OPTIONS = [
  { value: "all", label: "ทั้งหมด" },
  { value: "linked", label: "เชื่อมโยงแล้ว" },
  { value: "not_linked", label: "ยังไม่เชื่อมโยง" },
];

function getFullNameWithTitle(user: User) {
  const title = mockTitles.find((t) => t.id === user.titleId);
  return title ? `${title.name}${user.fullName}` : user.fullName;
}

function statusBadge(status: string) {
  if (status === "active") return <Badge variant="success">{TEXT_LABEL.STATUS_ACTIVE}</Badge>;
  if (status === "locked") return <Badge variant="destructive">{TEXT_LABEL.STATUS_LOCKED}</Badge>;
  return <Badge variant="secondary">{TEXT_LABEL.STATUS_INACTIVE}</Badge>;
}

export function UsersContent() {
  const [search, setSearch] = useState("");
  const [orgFilter, setOrgFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [thaidFilter, setThaidFilter] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  const filtered = mockUsers.filter((u) => {
    const matchSearch =
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchOrg = orgFilter === "all" || u.organizationId === orgFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    const matchThaid =
      thaidFilter === "all" ||
      (thaidFilter === "linked" && u.thaidLinked) ||
      (thaidFilter === "not_linked" && !u.thaidLinked);
    return matchSearch && matchOrg && matchStatus && matchThaid;
  });

  const columns = useMemo<DataTableColumn<User>[]>(() => [
    {
      key: "username", title: "ชื่อผู้ใช้", dataIndex: "username",
      sortable: true, width: 140,
      render: (val: string) => <span className="font-mono text-sm text-slate-900">{val}</span>,
    },
    {
      key: "fullName", title: "ชื่อ-นามสกุล", dataIndex: "fullName",
      sortable: true,
      render: (_: string, record: User) => (
        <span className="font-medium text-slate-900">{getFullNameWithTitle(record)}</span>
      ),
    },
    {
      key: "email", title: "อีเมล", dataIndex: "email", sortable: true,
      render: (val: string) => <span className="text-sm text-slate-600">{val}</span>,
    },
    {
      key: "organizationName", title: "หน่วยงาน", dataIndex: "organizationName",
      render: (val: string) => <span className="text-sm text-slate-600">{val}</span>,
    },
    {
      key: "thaidLinked", title: "ThaID", dataIndex: "thaidLinked",
      align: "center", width: 130,
      render: (val: boolean) => val
        ? <Badge variant="success" className="gap-1"><CheckCircle2 className="w-3 h-3" /> เชื่อมโยง</Badge>
        : <Badge variant="secondary" className="gap-1"><XCircle className="w-3 h-3" /> ยังไม่เชื่อมโยง</Badge>,
    },
    {
      key: "lastLogin", title: "เข้าสู่ระบบล่าสุด", dataIndex: "lastLogin",
      sortable: true, width: 160,
      render: (val: string) => (
        <span className="text-sm text-slate-600">
          {new Date(val).toLocaleString("th-TH", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
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
      render: (_: unknown, record: User) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedUser(record)}>
              <Eye className="w-4 h-4 mr-2" /> ดูรายละเอียด
            </DropdownMenuItem>
            <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> {TEXT_BUTTON.EDIT}</DropdownMenuItem>
            <DropdownMenuItem>
              {record.status === "locked"
                ? <><Unlock className="w-4 h-4 mr-2" /> ปลดล็อก</>
                : <><Lock className="w-4 h-4 mr-2" /> ล็อกบัญชี</>}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600"><Trash2 className="w-4 h-4 mr-2" /> {TEXT_BUTTON.DELETE}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [setSelectedUser]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{USERS_CONFIG.title}</h1>
          <p className="text-slate-600">{USERS_CONFIG.description}</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="w-4 h-4 mr-2" /> เพิ่มผู้ใช้งาน
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="ค้นหาผู้ใช้งาน (ชื่อผู้ใช้, ชื่อ-นามสกุล, อีเมล)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
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
                {USER_STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={thaidFilter} onValueChange={setThaidFilter}>
              <SelectTrigger><SelectValue placeholder="ThaID" /></SelectTrigger>
              <SelectContent>
                {THAID_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>รายการผู้ใช้งาน ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable<User>
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

      <UserCreateDialog open={showCreate} onClose={() => setShowCreate(false)} />
      <UserDetailDialog user={selectedUser} open={!!selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}
