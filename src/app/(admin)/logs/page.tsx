"use client";

import { useState } from "react";
import { Search, Info, AlertTriangle, AlertCircle, Flame } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { mockLogs } from "@/data/mockData";
import { format } from "date-fns";

type Severity = "info" | "warning" | "error" | "critical";

const severityConfig: Record<Severity, { label: string; variant: any; icon: any }> = {
  info: { label: "Info", variant: "default", icon: Info },
  warning: { label: "Warning", variant: "warning", icon: AlertTriangle },
  error: { label: "Error", variant: "destructive", icon: AlertCircle },
  critical: { label: "Critical", variant: "destructive", icon: Flame },
};

export default function LogsPage() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filtered = mockLogs.filter((l) => {
    const matchSearch =
      l.actor.includes(search) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.eventType.includes(search);
    const matchSeverity = severityFilter === "all" || l.severity === severityFilter;
    return matchSearch && matchSeverity;
  });

  const statCards = [
    { label: "Info", value: mockLogs.filter((l) => l.severity === "info").length, color: "text-indigo-600", bg: "bg-indigo-50", icon: Info },
    { label: "Warning", value: mockLogs.filter((l) => l.severity === "warning").length, color: "text-amber-600", bg: "bg-amber-50", icon: AlertTriangle },
    { label: "Error", value: mockLogs.filter((l) => l.severity === "error").length, color: "text-red-600", bg: "bg-red-50", icon: AlertCircle },
    { label: "Critical", value: mockLogs.filter((l) => l.severity === "critical").length, color: "text-red-800", bg: "bg-red-100", icon: Flame },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Audit Logs</h1>
        <p className="text-sm text-slate-500 mt-1">บันทึกกิจกรรมและการตรวจสอบความปลอดภัย</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{s.label}</p>
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

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="ค้นหา log..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select
              className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="all">ระดับทั้งหมด</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-6 py-3 font-medium text-slate-600">เวลา</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">ระดับ</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">ผู้กระทำ</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">กิจกรรม</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">ทรัพยากร</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">IP</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-600">ผลลัพธ์</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((log) => {
                  const sev = severityConfig[log.severity as Severity];
                  return (
                    <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-xs text-slate-600 whitespace-nowrap">
                        {format(new Date(log.timestamp), "dd/MM/yyyy HH:mm:ss")}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={sev.variant}>{sev.label}</Badge>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-700">{log.actor}</td>
                      <td className="px-6 py-4 text-slate-900">{log.action}</td>
                      <td className="px-6 py-4 text-slate-600">{log.resource}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-600">{log.ipAddress}</td>
                      <td className="px-6 py-4">
                        <Badge variant={log.status === "success" ? "success" : "destructive"}>
                          {log.status === "success" ? "สำเร็จ" : "ล้มเหลว"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-12 text-slate-400 text-sm">ไม่พบข้อมูล</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
