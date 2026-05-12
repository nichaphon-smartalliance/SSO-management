"use client";

import { useState, useMemo } from "react";
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
import { DataTable } from "@/components/common/DataTable";
import type { DataTableColumn } from "@/components/common/DataTable";

function statusBadge(status: string) {
  if (status === "approved") return <Badge variant="success" className="gap-1"><CheckCircle className="w-3 h-3" /> อนุมัติ</Badge>;
  if (status === "rejected") return <Badge variant="destructive" className="gap-1"><XCircle className="w-3 h-3" /> ปฏิเสธ</Badge>;
  return <Badge variant="secondary" className="gap-1"><Clock className="w-3 h-3" /> รอดำเนินการ</Badge>;
}

export function RequestsContent() {
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<AccessRequest | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewAction, setReviewAction] = useState<"approve" | "reject">("approve");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

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
    setReviewAction("approve");
    setShowReview(true);
  };

  const handleReject = () => {
    setReviewAction("reject");
    setShowReview(true);
  };

  const handleReviewConfirm = () => {
    setShowReview(false);
    setShowDetail(false);
    setSelectedRequest(null);
  };

  const columns = useMemo<DataTableColumn<AccessRequest>[]>(() => [
    {
      key: "requestNumber", title: "เลขที่คำขอ", dataIndex: "requestNumber",
      sortable: true, width: 140,
      render: (val: string) => <span className="font-mono text-sm text-slate-900">{val}</span>,
    },
    {
      key: "userName", title: "ผู้ขอใช้งาน", dataIndex: "userName",
      sortable: true,
      render: (val: string, record: AccessRequest) => (
        <div>
          <p className="font-medium text-slate-900">{val}</p>
          <p className="text-xs text-slate-500">{record.userEmail}</p>
        </div>
      ),
    },
    {
      key: "clientName", title: "ระบบงาน", dataIndex: "clientName",
      sortable: true,
      render: (val: string) => <span className="text-sm text-slate-900">{val}</span>,
    },
    {
      key: "organizationName", title: "หน่วยงาน", dataIndex: "organizationName",
      render: (val: string) => <span className="text-sm text-slate-600">{val}</span>,
    },
    {
      key: "requestedRole", title: "บทบาท", dataIndex: "requestedRole",
      width: 110,
      render: (val: string) => <Badge variant="outline">{val}</Badge>,
    },
    {
      key: "requestedAt", title: "วันที่ขอ", dataIndex: "requestedAt",
      sortable: true, width: 150,
      render: (val: string) => (
        <span className="text-sm text-slate-600">
          {new Date(val).toLocaleString("th-TH", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
        </span>
      ),
    },
    {
      key: "status", title: "สถานะ", dataIndex: "status",
      sortable: true, width: 130,
      render: (val: string) => statusBadge(val),
    },
    {
      key: "actions", title: "", align: "center", width: 80,
      render: (_: unknown, record: AccessRequest) => (
        <Button variant="ghost" size="sm" onClick={() => handleView(record)}>
          <Eye className="w-4 h-4 mr-2" /> ดูรายละเอียด
        </Button>
      ),
    },
  ], [handleView]);

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
            <TabsContent value="pending" className="mt-6">
              <DataTable<AccessRequest>
                rowKey="id"
                columns={columns}
                dataSource={pending}
                emptyText={TEXT_LABEL.NO_DATA}
                pagination={{ current: currentPage, pageSize: PAGE_SIZE, total: pending.length, showSizeChanger: false, showTotal: (total, range) => `${range[0]}-${range[1]} จาก ${total} รายการ`, onChange: (page) => setCurrentPage(page) }}
              />
            </TabsContent>
            <TabsContent value="approved" className="mt-6">
              <DataTable<AccessRequest>
                rowKey="id"
                columns={columns}
                dataSource={approved}
                emptyText={TEXT_LABEL.NO_DATA}
                pagination={{ current: currentPage, pageSize: PAGE_SIZE, total: approved.length, showSizeChanger: false, showTotal: (total, range) => `${range[0]}-${range[1]} จาก ${total} รายการ`, onChange: (page) => setCurrentPage(page) }}
              />
            </TabsContent>
            <TabsContent value="rejected" className="mt-6">
              <DataTable<AccessRequest>
                rowKey="id"
                columns={columns}
                dataSource={rejected}
                emptyText={TEXT_LABEL.NO_DATA}
                pagination={{ current: currentPage, pageSize: PAGE_SIZE, total: rejected.length, showSizeChanger: false, showTotal: (total, range) => `${range[0]}-${range[1]} จาก ${total} รายการ`, onChange: (page) => setCurrentPage(page) }}
              />
            </TabsContent>
            <TabsContent value="all" className="mt-6">
              <DataTable<AccessRequest>
                rowKey="id"
                columns={columns}
                dataSource={all}
                emptyText={TEXT_LABEL.NO_DATA}
                pagination={{ current: currentPage, pageSize: PAGE_SIZE, total: all.length, showSizeChanger: false, showTotal: (total, range) => `${range[0]}-${range[1]} จาก ${total} รายการ`, onChange: (page) => setCurrentPage(page) }}
              />
            </TabsContent>
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
