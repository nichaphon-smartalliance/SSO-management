"use client";

import { useState } from "react";
import { Search, CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { mockRequests as mockAccessRequests } from "@/data/mockData";
import { TEXT_LABEL } from "@/constant/text";
import { REQUESTS_CONFIG } from "./Requests.config";
import { RequestDetailDialog } from "./RequestDetailDialog";
import { RequestReviewDialog } from "./RequestReviewDialog";
import type { AccessRequest } from "@/types/app";

function statusBadge(status: string) {
  if (status === "approved") return <Badge variant="success" className="gap-1"><CheckCircle className="w-3 h-3" /> อนุมัติ</Badge>;
  if (status === "rejected") return <Badge variant="destructive" className="gap-1"><XCircle className="w-3 h-3" /> ปฏิเสธ</Badge>;
  return <Badge variant="secondary" className="gap-1"><Clock className="w-3 h-3" /> รอดำเนินการ</Badge>;
}

function RequestTable({ requests, onView }: { requests: AccessRequest[]; onView: (r: AccessRequest) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">เลขที่คำขอ</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ผู้ขอใช้งาน</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ระบบงาน</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">หน่วยงาน</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">บทบาท</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">วันที่ขอ</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">สถานะ</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">การดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr><td colSpan={8} className="py-8 text-center text-slate-400 text-sm">{TEXT_LABEL.NO_DATA}</td></tr>
          ) : requests.map((req) => (
            <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="py-3 px-4 font-mono text-sm text-slate-900">{req.requestNumber}</td>
              <td className="py-3 px-4">
                <p className="font-medium text-slate-900">{req.userName}</p>
                <p className="text-xs text-slate-500">{req.userEmail}</p>
              </td>
              <td className="py-3 px-4 text-sm text-slate-900">{req.clientName}</td>
              <td className="py-3 px-4 text-sm text-slate-600">{req.organizationName}</td>
              <td className="py-3 px-4"><Badge variant="outline">{req.requestedRole}</Badge></td>
              <td className="py-3 px-4 text-sm text-slate-600">
                {new Date(req.requestedAt).toLocaleString("th-TH", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
              </td>
              <td className="py-3 px-4">{statusBadge(req.status)}</td>
              <td className="py-3 px-4 text-right">
                <Button variant="ghost" size="sm" onClick={() => onView(req)}>
                  <Eye className="w-4 h-4 mr-2" /> ดูรายละเอียด
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RequestsContent() {
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<AccessRequest | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewAction, setReviewAction] = useState<"approve" | "reject">("approve");

  const filterByStatus = (status: string) =>
    mockAccessRequests.filter((req) => {
      const matchSearch =
        req.requestNumber.toLowerCase().includes(search.toLowerCase()) ||
        req.userName.toLowerCase().includes(search.toLowerCase()) ||
        req.clientName.toLowerCase().includes(search.toLowerCase());
      return matchSearch && (status === "all" || req.status === status);
    });

  const pending = filterByStatus("pending");
  const approved = filterByStatus("approved");
  const rejected = filterByStatus("rejected");
  const all = filterByStatus("all");

  const handleView = (req: AccessRequest) => {
    setSelectedRequest(req);
    setShowDetail(true);
  };

  const handleApprove = () => {
    setShowDetail(false);
    setReviewAction("approve");
    setShowReview(true);
  };

  const handleReject = () => {
    setShowDetail(false);
    setReviewAction("reject");
    setShowReview(true);
  };

  const handleReviewConfirm = () => {
    setShowReview(false);
    setSelectedRequest(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{REQUESTS_CONFIG.title}</h1>
        <p className="text-slate-600">{REQUESTS_CONFIG.description}</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="ค้นหาคำขอ (เลขที่คำขอ, ชื่อผู้ใช้, ระบบงาน)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>รายการคำขอ</CardTitle></CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pending">รอดำเนินการ ({pending.length})</TabsTrigger>
              <TabsTrigger value="approved">อนุมัติแล้ว ({approved.length})</TabsTrigger>
              <TabsTrigger value="rejected">ปฏิเสธแล้ว ({rejected.length})</TabsTrigger>
              <TabsTrigger value="all">ทั้งหมด ({all.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-6"><RequestTable requests={pending} onView={handleView} /></TabsContent>
            <TabsContent value="approved" className="mt-6"><RequestTable requests={approved} onView={handleView} /></TabsContent>
            <TabsContent value="rejected" className="mt-6"><RequestTable requests={rejected} onView={handleView} /></TabsContent>
            <TabsContent value="all" className="mt-6"><RequestTable requests={all} onView={handleView} /></TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <RequestDetailDialog
        request={selectedRequest}
        open={showDetail}
        onClose={() => { setShowDetail(false); setSelectedRequest(null); }}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <RequestReviewDialog
        request={selectedRequest}
        action={reviewAction}
        open={showReview}
        onClose={() => setShowReview(false)}
        onConfirm={handleReviewConfirm}
      />
    </div>
  );
}
