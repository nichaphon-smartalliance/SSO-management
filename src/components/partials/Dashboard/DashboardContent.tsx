"use client";

import { Building2, Users, AppWindow, ClipboardList, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { mockOrganizations, mockUsers, mockClients, mockRequests } from "@/data/mockData";

const loginData = [
  { month: "ม.ค.", logins: 1200 },
  { month: "ก.พ.", logins: 1900 },
  { month: "มี.ค.", logins: 1500 },
  { month: "เม.ย.", logins: 2200 },
  { month: "พ.ค.", logins: 1800 },
];

const clientStatusData = [
  { name: "Active", value: mockClients.filter((c) => c.status === "active").length },
  { name: "Inactive", value: mockClients.filter((c) => c.status === "inactive").length },
  { name: "Expired", value: mockClients.filter((c) => c.status === "expired").length },
];

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];

const orgActivityData = mockOrganizations.slice(0, 4).map((o) => ({
  name: o.code,
  users: o.userCount,
  clients: o.clientCount,
}));

const statCards = [
  { label: "หน่วยงานทั้งหมด", value: mockOrganizations.length, icon: Building2, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "ผู้ใช้งานทั้งหมด", value: mockUsers.length, icon: Users, color: "text-green-600", bg: "bg-green-50" },
  { label: "ระบบงาน (Client)", value: mockClients.length, icon: AppWindow, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "คำขอรออนุมัติ", value: mockRequests.filter((r) => r.status === "pending").length, icon: ClipboardList, color: "text-red-600", bg: "bg-red-50" },
];

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">แดชบอร์ด</h1>
        <p className="text-sm text-slate-500 mt-1">ภาพรวมระบบการจัดการ SSO</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="w-4 h-4 text-indigo-600" /> กิจกรรมการเข้าสู่ระบบ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={loginData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="logins" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} name="การเข้าสู่ระบบ" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">สถานะระบบงาน</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={clientStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {clientStatusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">กิจกรรมตามหน่วยงาน</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={orgActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#4f46e5" name="ผู้ใช้" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clients" fill="#10b981" name="ระบบงาน" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">คำขอล่าสุด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRequests.slice(0, 5).map((r) => (
                <div key={r.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{r.userName}</p>
                    <p className="text-xs text-slate-500">{r.clientName}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    r.status === "pending" ? "bg-amber-100 text-amber-700" :
                    r.status === "approved" ? "bg-green-100 text-green-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {r.status === "pending" ? "รอดำเนินการ" : r.status === "approved" ? "อนุมัติ" : "ปฏิเสธ"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
