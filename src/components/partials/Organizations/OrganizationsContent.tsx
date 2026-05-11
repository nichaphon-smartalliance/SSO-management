"use client";

import { useState } from "react";
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

  const filtered = mockOrganizations.filter((o) => {
    const matchSearch =
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      o.code.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">รหัสหน่วยงาน</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ชื่อหน่วยงาน</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ประเภท</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ผู้ติดต่อ</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ระบบงาน</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ผู้ใช้งาน</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">สถานะ</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="py-12 text-center text-slate-400 text-sm">{TEXT_LABEL.NO_DATA}</td></tr>
                ) : filtered.map((org) => (
                  <tr key={org.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono text-sm text-slate-900">{org.code}</td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-900">{org.name}</p>
                      <p className="text-xs text-slate-500">{org.nameEn}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{org.type}</td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-slate-900">{org.contactPerson}</p>
                      <p className="text-xs text-slate-500">{org.email}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900">{org.clientCount}</td>
                    <td className="py-3 px-4 text-sm text-slate-900">{org.userCount.toLocaleString()}</td>
                    <td className="py-3 px-4">{statusBadge(org.status)}</td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedOrg(org)}>
                            <Eye className="w-4 h-4 mr-2" /> ดูรายละเอียด
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" /> {TEXT_BUTTON.EDIT}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" /> {TEXT_BUTTON.DELETE}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <OrganizationCreateDialog open={showCreate} onClose={() => setShowCreate(false)} />
      <OrganizationDetailDialog org={selectedOrg} open={!!selectedOrg} onClose={() => setSelectedOrg(null)} />
    </div>
  );
}
