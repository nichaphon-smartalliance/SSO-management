"use client";

import { useMemo } from "react";
import {
  Building2, Users, Boxes, FileCheck,
  TrendingUp, AlertCircle, Clock, CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { mockOrganizations, mockUsers, mockClients, mockRequests } from "@/data/mockData";
import Link from "next/link";
import { DashboardHeader } from "./DashboardHeader";
import {
  DASHBOARD_CONFIG,
  LOGIN_CHART_DATA,
  CLIENT_STATUS_DATA,
  ORG_ACTIVITY_DATA,
} from "./Dashboard.config";
import { TEXT_BUTTON, TEXT_LABEL } from "@/constant/text";
import type { User } from "@/types/app";
import { DataTable } from "@/components/common/DataTable";
import type { DataTableColumn } from "@/components/common/DataTable";

const pendingRequests = mockRequests.filter((r) => r.status === "pending");
const recentUsers = mockUsers.slice(0, DASHBOARD_CONFIG.recentUserCount);
const expiringClients = mockClients.filter(
  (c) => new Date(c.expiryDate) <= new Date(DASHBOARD_CONFIG.expiryThresholdDate) && c.status !== "active"
);

const totalOrgs = mockOrganizations.length;
const activeOrgs = mockOrganizations.filter((o) => o.status === "active").length;
const totalUsers = mockUsers.length;
const activeUsers = mockUsers.filter((u) => u.status === "active").length;
const totalClients = mockClients.length;
const activeClients = mockClients.filter((c) => c.status === "active").length;

export function DashboardContent() {
  const recentColumns = useMemo<DataTableColumn<User>[]>(() => [
    {
      key: "username", title: "ชื่อผู้ใช้", dataIndex: "username",
      render: (val: string) => <span className="text-sm text-slate-900">{val}</span>,
    },
    {
      key: "fullName", title: "ชื่อ-นามสกุล", dataIndex: "fullName",
      render: (val: string) => <span className="text-sm text-slate-900">{val}</span>,
    },
    {
      key: "organizationName", title: "หน่วยงาน", dataIndex: "organizationName",
      render: (val: string) => <span className="text-sm text-slate-600">{val}</span>,
    },
    {
      key: "thaidLinked", title: "ThaID", dataIndex: "thaidLinked",
      align: "center", width: 120,
      render: (val: boolean) => val
        ? <Badge variant="success">{TEXT_LABEL.LINKED}</Badge>
        : <Badge variant="secondary">{TEXT_LABEL.NOT_LINKED}</Badge>,
    },
    {
      key: "status", title: "สถานะ", dataIndex: "status",
      width: 100,
      render: (val: string) => (
        <Badge variant={val === "active" ? "success" : val === "locked" ? "destructive" : "secondary"}>
          {val === "active" ? TEXT_LABEL.STATUS_ACTIVE : val === "locked" ? TEXT_LABEL.STATUS_LOCKED : TEXT_LABEL.STATUS_INACTIVE}
        </Badge>
      ),
    },
  ], []);

  return (
    <div className="space-y-6">
      <DashboardHeader />

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">หน่วยงานทั้งหมด</CardTitle>
            <Building2 className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalOrgs}</div>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <span className="text-green-600 font-medium">{activeOrgs} {TEXT_LABEL.ACTIVE}</span>
              <TrendingUp className="w-3 h-3 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">ผู้ใช้งานทั้งหมด</CardTitle>
            <Users className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalUsers.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <span className="text-green-600 font-medium">{activeUsers.toLocaleString()} {TEXT_LABEL.ACTIVE}</span>
              <TrendingUp className="w-3 h-3 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">ระบบงาน (Clients)</CardTitle>
            <Boxes className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalClients}</div>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <span className="text-green-600 font-medium">{activeClients} {TEXT_LABEL.ACTIVE}</span>
              <TrendingUp className="w-3 h-3 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">คำขอรอดำเนินการ</CardTitle>
            <FileCheck className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{pendingRequests.length}</div>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <span className="text-amber-600 font-medium">ต้องตรวจสอบ</span>
              <AlertCircle className="w-3 h-3 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              กิจกรรมการเข้าสู่ระบบ (7 วันล่าสุด)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={DASHBOARD_CONFIG.chartHeight}>
              <LineChart data={LOGIN_CHART_DATA}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="logins"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  name="การเข้าสู่ระบบสำเร็จ"
                />
                <Line
                  type="monotone"
                  dataKey="failed"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="การเข้าสู่ระบบล้มเหลว"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>สถานะระบบงาน (Clients)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={DASHBOARD_CONFIG.chartHeight}>
              <PieChart>
                <Pie
                  data={CLIENT_STATUS_DATA}
                  cx="50%" cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {CLIENT_STATUS_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Org activity — full width */}
      <Card>
        <CardHeader>
          <CardTitle>กิจกรรมตามหน่วยงาน</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={DASHBOARD_CONFIG.chartHeight}>
            <BarChart data={ORG_ACTIVITY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="org" stroke="#64748b" fontSize={11} angle={-15} textAnchor="end" height={80} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#4f46e5" name="จำนวนผู้ใช้งาน" />
              <Bar dataKey="clients" fill="#10b981" name="จำนวนระบบงาน" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pending requests + Expiring clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>คำขอรอดำเนินการ</CardTitle>
            <Link href="/requests">
              <Button variant="outline" size="sm">
                {TEXT_BUTTON.VIEW_ALL}
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                  <p>ไม่มีคำขอรอดำเนินการ</p>
                </div>
              ) : (
                pendingRequests.map((r) => (
                  <div key={r.id} className="flex items-start justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-slate-900">{r.userName}</p>
                        <Badge variant="outline">{r.requestNumber}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-1">{r.clientName}</p>
                      <p className="text-xs text-slate-500">{r.organizationName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <Badge variant="secondary">{TEXT_LABEL.STATUS_PENDING}</Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>ระบบงานใกล้หมดอายุ (30 วัน)</CardTitle>
            <Link href="/clients">
              <Button variant="outline" size="sm">{TEXT_BUTTON.VIEW_ALL}</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expiringClients.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                  <p>ไม่มีระบบงานใกล้หมดอายุ</p>
                </div>
              ) : (
                expiringClients.map((c) => (
                  <div key={c.id} className="flex items-start justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 mb-1">{c.clientName}</p>
                      <p className="text-xs text-slate-500">{c.organizationName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-600">
                        {new Date(c.expiryDate).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
                      </p>
                      <Badge variant="destructive" className="mt-1">
                        {c.status === "expired" ? TEXT_LABEL.STATUS_EXPIRED : TEXT_LABEL.STATUS_EXPIRING}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent users table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>ผู้ใช้งานล่าสุด</CardTitle>
          <Link href="/users">
            <Button variant="outline" size="sm">{TEXT_BUTTON.VIEW_ALL}</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <DataTable<User>
            rowKey="id"
            columns={recentColumns}
            dataSource={recentUsers}
            emptyText={TEXT_LABEL.NO_DATA}
          />
        </CardContent>
      </Card>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>การดำเนินการด่วน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/users">
              <Button variant="outline" className="w-full">
                <Users className="w-4 h-4 mr-2" /> เพิ่มผู้ใช้งาน
              </Button>
            </Link>
            <Link href="/clients">
              <Button variant="outline" className="w-full">
                <Boxes className="w-4 h-4 mr-2" /> เพิ่มระบบงาน
              </Button>
            </Link>
            <Link href="/requests">
              <Button variant="outline" className="w-full">
                <FileCheck className="w-4 h-4 mr-2" /> {TEXT_BUTTON.APPROVE}คำขอ
              </Button>
            </Link>
            <Link href="/logs">
              <Button variant="outline" className="w-full">
                <FileCheck className="w-4 h-4 mr-2" /> ดู Audit Logs
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
