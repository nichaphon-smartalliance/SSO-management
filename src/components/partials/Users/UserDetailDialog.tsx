"use client";

import { User, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { mockLoginHistory, mockTitles } from "@/data/mockData";
import { TEXT_BUTTON, TEXT_LABEL } from "@/constant/text";
import type { User as UserType } from "@/types/app";

interface Props {
  user: UserType | null;
  open: boolean;
  onClose: () => void;
}

function getTitleName(titleId?: string) {
  if (!titleId) return null;
  return mockTitles.find((t) => t.id === titleId)?.name ?? null;
}

function getFullName(user: UserType) {
  const title = getTitleName(user.titleId);
  return title ? `${title}${user.fullName}` : user.fullName;
}

function statusBadge(status: string) {
  if (status === "active") return <Badge variant="success">{TEXT_LABEL.STATUS_ACTIVE}</Badge>;
  if (status === "locked") return <Badge variant="destructive">{TEXT_LABEL.STATUS_LOCKED}</Badge>;
  return <Badge variant="secondary">{TEXT_LABEL.STATUS_INACTIVE}</Badge>;
}

export function UserDetailDialog({ user, open, onClose }: Props) {
  if (!user) return null;
  const loginHistory = mockLoginHistory.filter((l) => l.userId === user.id);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>รายละเอียดผู้ใช้งาน</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">ข้อมูลทั่วไป</TabsTrigger>
            <TabsTrigger value="login">ประวัติการเข้าสู่ระบบ</TabsTrigger>
            <TabsTrigger value="permissions">สิทธิ์การเข้าถึง</TabsTrigger>
          </TabsList>

          {/* General Info */}
          <TabsContent value="info" className="space-y-6 mt-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full shrink-0">
                <User className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900">{getFullName(user)}</h3>
                <p className="text-sm text-slate-600">{user.username}</p>
                <div className="flex items-center gap-2 mt-2">
                  {statusBadge(user.status)}
                  {user.thaidLinked && (
                    <Badge variant="success" className="gap-1">
                      <CheckCircle2 className="w-3 h-3" /> เชื่อมโยง ThaID
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-sm text-slate-500 mb-1">เลขบัตรประชาชน</p><p className="font-medium text-slate-900">{user.citizenId}</p></div>
              <div><p className="text-sm text-slate-500 mb-1">หน่วยงาน</p><p className="font-medium text-slate-900">{user.organizationName}</p></div>
              <div><p className="text-sm text-slate-500 mb-1">อีเมล</p><p className="font-medium text-slate-900">{user.email}</p></div>
              <div><p className="text-sm text-slate-500 mb-1">เบอร์โทรศัพท์</p><p className="font-medium text-slate-900">{user.phone}</p></div>
              <div>
                <p className="text-sm text-slate-500 mb-1">วันที่สร้าง</p>
                <p className="font-medium text-slate-900">
                  {new Date(user.createdAt).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">เข้าสู่ระบบล่าสุด</p>
                <p className="font-medium text-slate-900">
                  {new Date(user.lastLogin).toLocaleString("th-TH", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>

            {user.thaidLinked && (
              <div className="border-t pt-4">
                <h4 className="font-medium text-slate-900 mb-3">ข้อมูล ThaID</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">วันที่เชื่อมโยง</p>
                    <p className="font-medium text-slate-900">
                      {user.thaidLinkedAt ? new Date(user.thaidLinkedAt).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" }) : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">จำนวนครั้งการเข้าสู่ระบบ</p>
                    <p className="font-medium text-slate-900">{user.loginCount.toLocaleString()} ครั้ง</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Login History */}
          <TabsContent value="login" className="mt-6">
            <h4 className="font-medium text-slate-900 mb-4">ประวัติการเข้าสู่ระบบ (5 ครั้งล่าสุด)</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">วันที่/เวลา</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">IP Address</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">ตำแหน่ง</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {loginHistory.length === 0 ? (
                    <tr><td colSpan={4} className="py-8 text-center text-slate-400 text-sm">{TEXT_LABEL.NO_DATA}</td></tr>
                  ) : loginHistory.map((log) => (
                    <tr key={log.id} className="border-b border-slate-100">
                      <td className="py-3 px-4 text-sm text-slate-900">
                        {new Date(log.timestamp).toLocaleString("th-TH", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="py-3 px-4 font-mono text-sm text-slate-600">{log.ipAddress}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{log.location}</td>
                      <td className="py-3 px-4">
                        <Badge variant={log.status === "success" ? "success" : "destructive"}>
                          {log.status === "success" ? "สำเร็จ" : "ล้มเหลว"}
                        </Badge>
                        {log.failReason && <p className="text-xs text-red-600 mt-1">{log.failReason}</p>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Permissions */}
          <TabsContent value="permissions" className="mt-6">
            <h4 className="font-medium text-slate-900 mb-4">สิทธิ์การเข้าถึงระบบงาน</h4>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-900">ระบบบริหารทรัพยากรบุคคล</p>
                    <p className="text-sm text-slate-600 mt-1">บทบาท: User</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge variant="outline">hr.read</Badge>
                      <Badge variant="outline">hr.write</Badge>
                    </div>
                  </div>
                  <Badge variant="success">{TEXT_LABEL.STATUS_ACTIVE}</Badge>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>{TEXT_BUTTON.CLOSE}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
