"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { mockRequests } from "@/data/mockData";
import { format } from "date-fns";
import { TEXT_LABEL } from "@/constant/text";
import { RequestsHeader } from "./RequestsHeader";

function statusBadge(status: string) {
  if (status === "pending") return <Badge variant="warning">{TEXT_LABEL.STATUS_PENDING}</Badge>;
  if (status === "approved") return <Badge variant="success">{TEXT_LABEL.STATUS_APPROVED}</Badge>;
  return <Badge variant="destructive">{TEXT_LABEL.STATUS_REJECTED}</Badge>;
}

function RequestTable({ items }: { items: typeof mockRequests }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="text-left px-6 py-3 font-medium text-slate-600">เลขที่คำขอ</th>
            <th className="text-left px-6 py-3 font-medium text-slate-600">ผู้ใช้งาน</th>
            <th className="text-left px-6 py-3 font-medium text-slate-600">ระบบงาน</th>
            <th className="text-left px-6 py-3 font-medium text-slate-600">บทบาท</th>
            <th className="text-left px-6 py-3 font-medium text-slate-600">วันที่ขอ</th>
            <th className="text-left px-6 py-3 font-medium text-slate-600">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-mono text-xs text-indigo-600">{r.requestNumber}</td>
              <td className="px-6 py-4">
                <p className="font-medium text-slate-900">{r.userName}</p>
                <p className="text-xs text-slate-400">{r.userEmail}</p>
              </td>
              <td className="px-6 py-4 text-slate-600">{r.clientName}</td>
              <td className="px-6 py-4 text-slate-600">{r.requestedRole}</td>
              <td className="px-6 py-4 text-slate-600 text-xs">
                {format(new Date(r.requestedAt), "dd/MM/yyyy HH:mm")}
              </td>
              <td className="px-6 py-4">{statusBadge(r.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && (
        <div className="text-center py-12 text-slate-400 text-sm">{TEXT_LABEL.NO_DATA}</div>
      )}
    </div>
  );
}

export function RequestsContent() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("pending");

  const forTab = (status: string) =>
    mockRequests.filter((r) => {
      const matchTab = status === "all" || r.status === status;
      const matchSearch =
        r.userName.includes(search) ||
        r.clientName.includes(search) ||
        r.requestNumber.includes(search);
      return matchTab && matchSearch;
    });

  const tabs = [
    { key: "pending", label: `รออนุมัติ (${mockRequests.filter((r) => r.status === "pending").length})` },
    { key: "approved", label: `อนุมัติแล้ว (${mockRequests.filter((r) => r.status === "approved").length})` },
    { key: "rejected", label: `ปฏิเสธ (${mockRequests.filter((r) => r.status === "rejected").length})` },
    { key: "all", label: "ทั้งหมด" },
  ];

  return (
    <div className="space-y-6">
      <RequestsHeader />

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="ค้นหาคำขอ..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t.key} value={t.key}>{t.label}</TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((t) => (
          <TabsContent key={t.key} value={t.key}>
            <Card>
              <CardContent className="p-0">
                <RequestTable items={forTab(t.key)} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
