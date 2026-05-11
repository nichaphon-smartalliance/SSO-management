"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { useState } from "react";
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
  const [effectiveDate, setEffectiveDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [note, setNote] = useState("");

  const handleConfirm = () => {
    console.log("Review:", { requestId: request?.id, action, effectiveDate, expiryDate, note });
    onConfirm();
    setEffectiveDate("");
    setExpiryDate("");
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
            {action === "approve" ? "กรุณากำหนดวันที่มีผลและวันหมดอายุของสิทธิ์" : "กรุณาระบุเหตุผลในการปฏิเสธคำขอ"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {action === "approve" ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="effectiveDate">วันที่มีผล *</Label>
                  <Input id="effectiveDate" type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">วันหมดอายุ *</Label>
                  <Input id="expiryDate" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="note">หมายเหตุ (ถ้ามี)</Label>
                <Textarea id="note" placeholder="ระบุหมายเหตุหรือข้อความเพิ่มเติม..." rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="note">เหตุผลในการปฏิเสธ *</Label>
              <Textarea id="note" placeholder="ระบุเหตุผลในการปฏิเสธคำขอ..." rows={4} value={note} onChange={(e) => setNote(e.target.value)} />
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
          <Button variant={action === "approve" ? "default" : "destructive"} onClick={handleConfirm}>
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
