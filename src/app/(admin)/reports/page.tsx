"use client";

import { Download, Users, AppWindow, Building2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { mockOrganizations, mockUsers, mockClients } from "@/data/mockData";

const userGrowth = [
  { month: "ม.ค.", users: 120 },
  { month: "ก.พ.", users: 180 },
  { month: "มี.ค.", users: 250 },
  { month: "เม.ย.", users: 310 },
  { month: "พ.ค.", users: mockUsers.length * 10 },
];

const loginTrend = [
  { month: "ม.ค.", logins: 4200 },
  { month: "ก.พ.", logins: 5100 },
  { month: "มี.ค.", logins: 4800 },
  { month: "เม.ย.", logins: 6300 },
  { month: "พ.ค.", logins: 5900 },
];

const topClients = mockClients.map((c, i) => ({ name: c.clientName, value: [450, 320, 280, 190][i] ?? 100 }));
const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];

const orgUsage = mockOrganizations.slice(0, 5).map((o) => ({
  org: o.code,
  users: o.userCount,
  logins: o.userCount * 3,
}));

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">รายงาน</h1>
          <p className="text-sm text-slate-500 mt-1">สถิติและข้อมูลการใช้งานระบบ</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="w-4 h-4" /> PDF</Button>
          <Button variant="outline" size="sm"><Download className="w-4 h-4" /> Excel</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "ผู้ใช้ทั้งหมด", value: mockUsers.length, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "การเข้าสู่ระบบ/เดือน", value: "5,900", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
          { label: "ระบบงาน", value: mockClients.length, icon: AppWindow, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "หน่วยงาน", value: mockOrganizations.length, icon: Building2, color: "text-red-600", bg: "bg-red-50" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">{s.label}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-0.5">{s.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">การเติบโตของผู้ใช้</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={2} name="ผู้ใช้" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">แนวโน้มการเข้าสู่ระบบ</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={loginTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="logins" stroke="#10b981" strokeWidth={2} name="การเข้าสู่ระบบ" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">ระบบงานยอดนิยม</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={topClients} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {topClients.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">การใช้งานตามหน่วยงาน</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={orgUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="org" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#4f46e5" name="ผู้ใช้" radius={[4, 4, 0, 0]} />
                <Bar dataKey="logins" fill="#10b981" name="การเข้าสู่ระบบ" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
