"use client";

import { useState } from "react";
import type { Dayjs } from "dayjs";
import { TrendingUp, Download, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { ReusableChart } from "@/components/ui/Chart";
import BuddhistDatePicker from "@/components/ui/DatePicker/BuddhistDatePicker";
import {
  REPORTS_CONFIG,
  REPORT_TYPE_OPTIONS,
  REPORT_STAT_CARDS,
  USER_GROWTH_DATA,
  LOGIN_TREND_DATA,
  TOP_CLIENTS_DATA,
  ORG_USAGE_DATA,
  SUMMARY_TABLE_ROWS,
  SUMMARY_TABLE_TOTAL,
} from "./Reports.config";

export function ReportsContent() {
  const [reportType, setReportType] = useState("overview");
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo]     = useState<Dayjs | null>(null);

  const handleExport = (format: "pdf" | "excel") => {
    console.log(`Exporting report as ${format}...`);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{REPORTS_CONFIG.title}</h1>
          <p className="text-slate-600">{REPORTS_CONFIG.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <Download className="w-4 h-4 mr-2" /> ส่งออก PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport("excel")}>
            <Download className="w-4 h-4 mr-2" /> ส่งออก Excel
          </Button>
        </div>
      </div>

      {/* Filter Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" /> ตัวกรองรายงาน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">ประเภทรายงาน</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {REPORT_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFrom">วันที่เริ่มต้น</Label>
              <BuddhistDatePicker
                value={dateFrom}
                onChange={(val) => setDateFrom(Array.isArray(val) ? (val[0] ?? null) : val)}
                placeholder="เลือกวันที่เริ่มต้น"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateTo">วันที่สิ้นสุด</Label>
              <BuddhistDatePicker
                value={dateTo}
                onChange={(val) => setDateTo(Array.isArray(val) ? (val[0] ?? null) : val)}
                placeholder="เลือกวันที่สิ้นสุด"
                disabledDate={(d) => !!dateFrom && d.isBefore(dateFrom, "day")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {REPORT_STAT_CARDS.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-semibold text-slate-900">{s.value}</p>
                {s.trendUp !== null ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{s.trend}</span>
                  </div>
                ) : (
                  <span className="text-sm text-slate-500">{s.trend}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts — 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* User Growth Line Chart */}
        <Card>
          <CardHeader><CardTitle>การเติบโตของผู้ใช้งาน</CardTitle></CardHeader>
          <CardContent>
            <ReusableChart
              type="line"
              data={USER_GROWTH_DATA}
              xKey="month"
              height={300}
              series={[{ dataKey: "users", name: "จำนวนผู้ใช้งาน", color: "#4f46e5" }]}
            />
          </CardContent>
        </Card>

        {/* Login Trend Line Chart */}
        <Card>
          <CardHeader><CardTitle>แนวโน้มการเข้าสู่ระบบ</CardTitle></CardHeader>
          <CardContent>
            <ReusableChart
              type="line"
              data={LOGIN_TREND_DATA}
              xKey="date"
              height={300}
              series={[{ dataKey: "logins", name: "จำนวนครั้งเข้าสู่ระบบ", color: "#10b981" }]}
            />
          </CardContent>
        </Card>

        {/* Top Clients Pie Chart */}
        <Card>
          <CardHeader><CardTitle>ระบบงานที่ใช้บริการมากที่สุด</CardTitle></CardHeader>
          <CardContent>
            <ReusableChart
              type="pie"
              data={TOP_CLIENTS_DATA}
              xKey="name"
              height={300}
              series={[{ dataKey: "value", name: "การใช้งาน", color: "#4f46e5" }]}
            />
          </CardContent>
        </Card>

        {/* Org Usage Bar Chart */}
        <Card>
          <CardHeader><CardTitle>การใช้งานตามหน่วยงาน</CardTitle></CardHeader>
          <CardContent>
            <ReusableChart
              type="bar"
              data={ORG_USAGE_DATA}
              xKey="org"
              height={300}
              series={[
                { dataKey: "active",   name: "ใช้งาน",     color: "#10b981" },
                { dataKey: "inactive", name: "ไม่ใช้งาน", color: "#94a3b8" },
              ]}
              xAxisProps={{ fontSize: 10, angle: -15, textAnchor: "end", height: 80 }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Summary Table */}
      <Card>
        <CardHeader><CardTitle>สรุปรายละเอียด</CardTitle></CardHeader>
        <CardContent>
          <h4 className="font-medium text-slate-900 mb-3">สรุปตามหน่วยงาน</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">หน่วยงาน</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">ผู้ใช้งาน</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">ระบบงาน</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">การเข้าสู่ระบบ (30 วัน)</th>
                </tr>
              </thead>
              <tbody>
                {SUMMARY_TABLE_ROWS.map((row) => (
                  <tr key={row.org} className="border-b border-slate-100">
                    <td className="py-3 px-4 text-sm text-slate-900">{row.org}</td>
                    <td className="py-3 px-4 text-sm text-right text-slate-900">{row.users}</td>
                    <td className="py-3 px-4 text-sm text-right text-slate-900">{row.systems}</td>
                    <td className="py-3 px-4 text-sm text-right text-slate-900">{row.logins}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-medium border-t border-slate-200">
                  <td className="py-3 px-4 text-sm text-slate-900">รวม</td>
                  <td className="py-3 px-4 text-sm text-right text-slate-900">{SUMMARY_TABLE_TOTAL.users}</td>
                  <td className="py-3 px-4 text-sm text-right text-slate-900">{SUMMARY_TABLE_TOTAL.systems}</td>
                  <td className="py-3 px-4 text-sm text-right text-slate-900">{SUMMARY_TABLE_TOTAL.logins}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
