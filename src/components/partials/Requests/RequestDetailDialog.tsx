"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TEXT_BUTTON } from "@/constant/text";
import type { AccessRequest } from "@/types/app";

interface Props {
  request: AccessRequest | null;
  open: boolean;
  onClose: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}

function statusBadge(status: string) {
  if (status === "approved") return <Badge variant="success">อนุมัติ</Badge>;
  if (status === "rejected") return <Badge variant="destructive">ปฏิเสธ</Badge>;
  return <Badge variant="secondary">รอดำเนินการ</Badge>;
}

export function RequestDetailDialog({ request, open, onClose, onApprove, onReject }: Props) {
  if (!request) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>รายละเอียดคำขอใช้งานระบบ</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500 mb-1">เลขที่คำขอ</p>
              <p className="font-mono font-medium text-slate-900">{request.requestNumber}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">สถานะ</p>
              {statusBadge(request.status)}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-slate-900 mb-3">ข้อมูลผู้ขอใช้งาน</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">ชื่อ-นามสกุล</p>
                <p className="font-medium text-slate-900">{request.userName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">อีเมล</p>
                <p className="font-medium text-slate-900">{request.userEmail}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-slate-500 mb-1">หน่วยงาน</p>
                <p className="font-medium text-slate-900">{request.organizationName}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-slate-900 mb-3">รายละเอียดคำขอ</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">ระบบงานที่ขอเข้าใช้</p>
                <p className="font-medium text-slate-900">{request.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">บทบาทที่ขอ</p>
                <Badge variant="outline">{request.requestedRole}</Badge>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-2">Scopes ที่ขอ</p>
                <div className="flex flex-wrap gap-2">
                  {request.requestedScopes.map((scope, i) => (
                    <Badge key={i} variant="secondary">{scope}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">เหตุผลในการขอใช้งาน</p>
                <p className="text-sm text-slate-900 bg-slate-50 p-3 rounded-lg">{request.reason}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">วันที่ส่งคำขอ</p>
                <p className="font-medium text-slate-900">
                  {new Date(request.requestedAt).toLocaleString("th-TH", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          </div>

          {request.status !== "pending" && (
            <div className="border-t pt-4">
              <h4 className="font-medium text-slate-900 mb-3">ผลการพิจารณา</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">ผู้พิจารณา</p>
                    <p className="font-medium text-slate-900">{request.reviewedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">วันที่พิจารณา</p>
                    <p className="font-medium text-slate-900">
                      {request.reviewedAt && new Date(request.reviewedAt).toLocaleString("th-TH", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
                {request.status === "approved" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">วันที่มีผล</p>
                      <p className="font-medium text-slate-900">
                        {request.effectiveDate && new Date(request.effectiveDate).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">วันหมดอายุ</p>
                      <p className="font-medium text-slate-900">
                        {request.expiryDate && new Date(request.expiryDate).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                  </div>
                )}
                {request.reviewNote && (
                  <div>
                    <p className="text-sm text-slate-500 mb-1">หมายเหตุ</p>
                    <p className="text-sm text-slate-900 bg-slate-50 p-3 rounded-lg">{request.reviewNote}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{TEXT_BUTTON.CLOSE}</Button>
          {request.status === "pending" && (
            <>
              <Button variant="destructive" onClick={onReject}>
                <XCircle className="w-4 h-4 mr-2" /> ปฏิเสธ
              </Button>
              <Button onClick={onApprove}>
                <CheckCircle className="w-4 h-4 mr-2" /> อนุมัติ
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
