"use client";

import { Building2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Organization } from "@/types/app";

interface Props {
  org: Organization | null;
  open: boolean;
  onClose: () => void;
}

function statusBadge(status: string) {
  if (status === "active") return <Badge variant="success">ใช้งาน</Badge>;
  if (status === "suspended") return <Badge variant="destructive">ระงับ</Badge>;
  return <Badge variant="secondary">ไม่ใช้งาน</Badge>;
}

export function OrganizationDetailDialog({ org, open, onClose }: Props) {
  if (!org) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>รายละเอียดหน่วยงาน</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-lg shrink-0">
              <Building2 className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">{org.name}</h3>
              <p className="text-sm text-slate-600">{org.nameEn}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{org.code}</Badge>
                {statusBadge(org.status)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500 mb-1">ประเภทหน่วยงาน</p>
              <p className="font-medium text-slate-900">{org.type}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">วันที่สร้าง</p>
              <p className="font-medium text-slate-900">
                {new Date(org.createdAt).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">ผู้ติดต่อ</p>
              <p className="font-medium text-slate-900">{org.contactPerson}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">เบอร์โทรศัพท์</p>
              <p className="font-medium text-slate-900">{org.phone}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-slate-500 mb-1">อีเมล</p>
              <p className="font-medium text-slate-900">{org.email}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-slate-900 mb-3">สถิติการใช้งาน</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-600 mb-1">จำนวนระบบงาน</p>
                <p className="text-2xl font-semibold text-indigo-900">{org.clientCount}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 mb-1">จำนวนผู้ใช้งาน</p>
                <p className="text-2xl font-semibold text-green-900">{org.userCount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>ปิด</Button>
          <Button>แก้ไขข้อมูล</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
