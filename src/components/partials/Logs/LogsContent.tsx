"use client";

import { useState } from "react";
import { Search, Download, Eye, AlertCircle, AlertTriangle, Info, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";

// === NEW IMPORTS ===
import dayjs from "dayjs";
import BuddhistDatePicker from "@/components/ui/DatePicker/BuddhistDatePicker"; // ← Adjust path if needed

import { mockLogs as mockAuditLogs } from "@/data/mockData";
import { TEXT_LABEL, TEXT_BUTTON } from "@/constant/text";
import { LOG_STATUS_OPTIONS, LOGS_CONFIG } from "./Logs.config";
import type { AuditLog } from "@/types/app";

const EVENT_TYPE_OPTIONS = [
  { value: "all", label: "ทั้งหมด" },
  { value: "USER_LOGIN", label: "เข้าสู่ระบบ" },
  { value: "USER_CREATED", label: "สร้างผู้ใช้" },
  { value: "CLIENT_ACCESS", label: "เข้าถึง Client" },
  { value: "CLIENT_CREATED", label: "สร้าง Client" },
  { value: "CLIENT_SECRET_ROTATED", label: "หมุนเวียน Secret" },
  { value: "PERMISSION_GRANTED", label: "มอบสิทธิ์" },
  { value: "CONFIG_CHANGED", label: "เปลี่ยนการตั้งค่า" },
  { value: "UNAUTHORIZED_ACCESS", label: "เข้าถึงไม่ได้รับอนุญาต" },
];

const SEVERITY_OPTIONS = [
  { value: "all", label: "ทั้งหมด" },
  { value: "info", label: "Info" },
  { value: "warning", label: "Warning" },
  { value: "error", label: "Error" },
  { value: "critical", label: "Critical" },
];

function getSeverityStyle(severity: string) {
  switch (severity) {
    case "critical": return "text-purple-600 bg-purple-100";
    case "error": return "text-red-600 bg-red-100";
    case "warning": return "text-amber-600 bg-amber-100";
    default: return "text-blue-600 bg-blue-100";
  }
}

function getSeverityIcon(severity: string) {
  switch (severity) {
    case "critical": return <XCircle className="w-4 h-4" />;
    case "error": return <AlertCircle className="w-4 h-4" />;
    case "warning": return <AlertTriangle className="w-4 h-4" />;
    default: return <Info className="w-4 h-4" />;
  }
}

export function LogsContent() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");

  // Changed to dayjs (required by AntD Buddhist picker)
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);

  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const filtered = mockAuditLogs.filter((log) => {
    const matchSearch =
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.eventType.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());

    const matchSeverity = severityFilter === "all" || log.severity === severityFilter;
    const matchStatus = statusFilter === "all" || log.status === statusFilter;
    const matchEventType = eventTypeFilter === "all" || log.eventType === eventTypeFilter;

    let matchDateRange = true;
    if (startDate || endDate) {
      const logDate = dayjs(log.timestamp).startOf("day");

      if (startDate) {
        matchDateRange = matchDateRange && logDate >= (startDate.startOf("day"));
      }
      if (endDate) {
        matchDateRange = matchDateRange && logDate <= (endDate.endOf("day"));
      }
    }

    return matchSearch && matchSeverity && matchStatus && matchEventType && matchDateRange;
  });

  const counts = {
    info: mockAuditLogs.filter((l) => l.severity === "info").length,
    warning: mockAuditLogs.filter((l) => l.severity === "warning").length,
    error: mockAuditLogs.filter((l) => l.severity === "error").length,
    critical: mockAuditLogs.filter((l) => l.severity === "critical").length,
  };

  return (
    <div className="space-y-6">
     
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{LOGS_CONFIG.title}</h1>
          <p className="text-slate-600 mt-1">{LOGS_CONFIG.description}</p>
        </div>
        <Button onClick={() => console.log("Exporting...")}>
          <Download className="w-4 h-4 mr-2" /> ส่งออกข้อมูล
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Info", count: counts.info, icon: <Info className="w-4 h-4 text-blue-500" />, color: "text-blue-600" },
          { label: "Warning", count: counts.warning, icon: <AlertTriangle className="w-4 h-4 text-amber-500" />, color: "text-amber-600" },
          { label: "Error", count: counts.error, icon: <AlertCircle className="w-4 h-4 text-red-500" />, color: "text-red-600" },
          { label: "Critical", count: counts.critical, icon: <XCircle className="w-4 h-4 text-purple-500" />, color: "text-purple-600" },
        ].map(({ label, count, icon, color }) => (
          <Card key={label}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                {icon} {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl font-semibold ${color}`}>{count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Row 1: search + 3 selects */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="ค้นหา (ผู้ใช้, การกระทำ, รายละเอียด)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
              <SelectTrigger><SelectValue placeholder="ประเภทเหตุการณ์" /></SelectTrigger>
              <SelectContent>
                {EVENT_TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger><SelectValue placeholder="ระดับความสำคัญ" /></SelectTrigger>
              <SelectContent>
                {SEVERITY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger><SelectValue placeholder="สถานะ" /></SelectTrigger>
              <SelectContent>
                {LOG_STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Row 2: date range (wraps naturally in the 5-col grid) */}
            <div className="space-y-1.5">
              <Label>วันที่เริ่มต้น</Label>
              <BuddhistDatePicker
                value={startDate}
                onChange={(date) => setStartDate(date as dayjs.Dayjs | null)}
                placeholder="เลือกวันที่เริ่มต้น"
                format="DD/MM/BBBB"
                style={{ width: "100%" }}
              />
            </div>

            <div className="space-y-1.5">
              <Label>วันที่สิ้นสุด</Label>
              <BuddhistDatePicker
                value={endDate}
                onChange={(date) => setEndDate(date as dayjs.Dayjs | null)}
                placeholder="เลือกวันที่สิ้นสุด"
                format="DD/MM/BBBB"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader><CardTitle>บันทึกกิจกรรม ({filtered.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">เวลา</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ระดับ</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ผู้ดำเนินการ</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">การกระทำ</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ทรัพยากร</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">IP Address</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">สถานะ</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="py-12 text-center text-slate-400 text-sm">{TEXT_LABEL.NO_DATA}</td></tr>
                ) : filtered.map((log) => (
                  <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-slate-900">
                      {new Date(log.timestamp).toLocaleString("th-TH", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`${getSeverityStyle(log.severity)} border-0`}>
                        <span className="flex items-center gap-1">
                          {getSeverityIcon(log.severity)} {log.severity.toUpperCase()}
                        </span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-slate-900">{log.actor}</p>
                      <p className="text-xs text-slate-500">{log.actorRole}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900">{log.action}</td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-slate-900">{log.resource}</p>
                      <p className="text-xs text-slate-500 font-mono">{log.resourceId}</p>
                    </td>
                    <td className="py-3 px-4 text-sm font-mono text-slate-600">{log.ipAddress}</td>
                    <td className="py-3 px-4">
                      <Badge variant={log.status === "success" ? "success" : "destructive"}>
                        {log.status === "success" ? "สำเร็จ" : "ล้มเหลว"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedLog(log)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Log Detail Dialog */}
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader><DialogTitle>รายละเอียด Log</DialogTitle></DialogHeader>
          {selectedLog && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Timestamp</p>
                  <p className="font-medium text-slate-900">
                    {new Date(selectedLog.timestamp).toLocaleString("th-TH", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">ระดับความสำคัญ</p>
                  <Badge className={`${getSeverityStyle(selectedLog.severity)} border-0`}>
                    <span className="flex items-center gap-1">{getSeverityIcon(selectedLog.severity)} {selectedLog.severity.toUpperCase()}</span>
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">ประเภทเหตุการณ์</p>
                  <Badge variant="outline">{selectedLog.eventType}</Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">สถานะ</p>
                  <Badge variant={selectedLog.status === "success" ? "success" : "destructive"}>
                    {selectedLog.status === "success" ? "สำเร็จ" : "ล้มเหลว"}
                  </Badge>
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-medium text-slate-900 mb-3">ข้อมูลผู้ดำเนินการ</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">ผู้ดำเนินการ</p>
                    <p className="font-medium text-slate-900">{selectedLog.actor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">บทบาท</p>
                    <p className="font-medium text-slate-900">{selectedLog.actorRole}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">IP Address</p>
                    <p className="font-medium text-slate-900 font-mono">{selectedLog.ipAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">User Agent</p>
                    <p className="text-sm text-slate-900 break-all">{selectedLog.userAgent}</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-medium text-slate-900 mb-3">รายละเอียดการกระทำ</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">การกระทำ</p>
                    <p className="font-medium text-slate-900">{selectedLog.action}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">ทรัพยากร</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{selectedLog.resource}</Badge>
                      <span className="font-mono text-sm text-slate-600">{selectedLog.resourceId}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">รายละเอียดเพิ่มเติม</p>
                    <p className="text-sm text-slate-900 bg-slate-50 p-3 rounded-lg">{selectedLog.details}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedLog(null)}>{TEXT_BUTTON.CLOSE}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
