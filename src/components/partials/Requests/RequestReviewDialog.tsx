"use client";

import { useState } from "react";
import type { Dayjs } from "dayjs";
import { CheckCircle, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import BuddhistDatePicker from "@/components/ui/DatePicker/BuddhistDatePicker";
import { TEXT_BUTTON } from "@/constant/text";
import type { AccessRequest } from "@/types/app";

interface Props {
  request: AccessRequest | null;
  action: "approve" | "reject";
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function RequestReviewDialog({ request, action, open, onClose, onConfirm }: Props) {
  const [effectiveDate, setEffectiveDate] = useState<Dayjs | null>(null);
  const [expiryDate, setExpiryDate] = useState<Dayjs | null>(null);
  const [note, setNote] = useState("");

  const handleConfirm = () => {
    console.log("Review:", {
      requestId: request?.id,
      action,
      effectiveDate: effectiveDate?.toISOString(),
      expiryDate: expiryDate?.toISOString(),
      note,
    });
    onConfirm();
    setEffectiveDate(null);
    setExpiryDate(null);
    setNote("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {action === "approve" ? "อนุมัติคำขอใช้งานระบบ" : "ปฏิเสธคำขอใช้งานระบบ"}
          </DialogTitle>
          <DialogDescription>
            {action === "approve"
              ? "กรุณากำหนดวันที่มีผลและวันหมดอายุของสิทธิ์"
              : "กรุณาระบุเหตุผลในการปฏิเสธคำขอ"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {action === "approve" ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>วันที่มีผล *</Label>
                  <BuddhistDatePicker
                    value={effectiveDate}
                    onChange={(val) => setEffectiveDate(Array.isArray(val) ? (val[0] ?? null) : val)}
                    placeholder="เลือกวันที่มีผล"
                  />
                </div>
                <div className="space-y-2">
                  <Label>วันหมดอายุ *</Label>
                  <BuddhistDatePicker
                    value={expiryDate}
                    onChange={(val) => setExpiryDate(Array.isArray(val) ? (val[0] ?? null) : val)}
                    placeholder="เลือกวันหมดอายุ"
                    disabledDate={(d) => !!effectiveDate && d.isBefore(effectiveDate, "day")}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>หมายเหตุ (ถ้ามี)</Label>
                <Textarea
                  placeholder="ระบุหมายเหตุหรือข้อความเพิ่มเติม..."
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label>เหตุผลในการปฏิเสธ *</Label>
              <Textarea
                placeholder="ระบุเหตุผลในการปฏิเสธคำขอ..."
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          )}

          {request && (
            <div className="border-t pt-4 space-y-2">
              <p className="text-sm font-medium text-slate-900">สรุปคำขอ</p>
              <div className="text-sm text-slate-600 space-y-1">
                <p><span className="font-medium">ผู้ขอ:</span> {request.userName}</p>
                <p><span className="font-medium">ระบบงาน:</span> {request.clientName}</p>
                <p><span className="font-medium">บทบาท:</span> {request.requestedRole}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{TEXT_BUTTON.CANCEL}</Button>
          <Button
            variant={action === "approve" ? "default" : "destructive"}
            onClick={handleConfirm}
          >
            {action === "approve" ? (
              <><CheckCircle className="w-4 h-4 mr-2" /> ยืนยันการอนุมัติ</>
            ) : (
              <><XCircle className="w-4 h-4 mr-2" /> ยืนยันการปฏิเสธ</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
