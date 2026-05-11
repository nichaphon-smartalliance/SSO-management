"use client";

import { Copy, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { AlertTriangle, Key } from "lucide-react";
import { useState } from "react";
import { TEXT_BUTTON } from "@/constant/text";
import type { Client } from "@/types/app";

interface Props {
  client: Client | null;
  open: boolean;
  onClose: () => void;
}

function statusBadge(status: string) {
  if (status === "active") return <Badge variant="success">ใช้งาน</Badge>;
  if (status === "expired") return <Badge variant="destructive">หมดอายุ</Badge>;
  return <Badge variant="secondary">ไม่ใช้งาน</Badge>;
}

export function ClientDetailDialog({ client, open, onClose }: Props) {
  const [showSecret, setShowSecret] = useState(false);
  const [newSecret, setNewSecret] = useState("");

  const handleRotate = () => {
    const secret = "sk_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setNewSecret(secret);
  };

  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  if (!client) return null;
  return (
    <>
      <Dialog open={open && !showSecret} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>รายละเอียดระบบงาน</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">{client.clientName}</h3>
              <p className="text-sm font-mono text-slate-600">{client.clientId}</p>
              <div className="flex items-center gap-2 mt-2">
                {statusBadge(client.status)}
                <Badge variant="outline">{client.organizationName}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">วันที่มีผล</p>
                <p className="font-medium text-slate-900">
                  {new Date(client.effectiveDate).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">วันหมดอายุ</p>
                <p className="font-medium text-slate-900">
                  {new Date(client.expiryDate).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">วันที่สร้าง</p>
                <p className="font-medium text-slate-900">
                  {new Date(client.createdAt).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">ใช้งานล่าสุด</p>
                <p className="font-medium text-slate-900">
                  {client.lastUsed ? new Date(client.lastUsed).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" }) : "ยังไม่เคยใช้งาน"}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-2">Redirect URIs</p>
              <div className="space-y-2">
                {client.redirectUris.map((uri, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded font-mono text-sm">
                    <span className="flex-1 text-slate-900">{uri}</span>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(uri)}>
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-2">Scopes</p>
              <div className="flex flex-wrap gap-2">
                {client.scopes.map((scope, i) => <Badge key={i} variant="outline">{scope}</Badge>)}
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-2">Grant Types</p>
              <div className="flex flex-wrap gap-2">
                {client.grantTypes.map((type, i) => <Badge key={i} variant="secondary">{type}</Badge>)}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>{TEXT_BUTTON.CLOSE}</Button>
            <Button variant="outline" onClick={() => setShowSecret(true)}>
              <RefreshCw className="w-4 h-4 mr-2" /> หมุนเวียน Secret
            </Button>
            <Button>แก้ไขข้อมูล</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSecret} onOpenChange={() => { setShowSecret(false); setNewSecret(""); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>หมุนเวียน Client Secret</DialogTitle>
            <DialogDescription>
              การหมุนเวียน Secret จะทำให้ Secret เดิมไม่สามารถใช้งานได้อีกต่อไป กรุณาบันทึก Secret ใหม่และอัพเดทในระบบงานของคุณทันที
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">คำเตือน</p>
                <p>Secret ใหม่จะแสดงเพียงครั้งเดียว กรุณาคัดลอกและบันทึกไว้อย่างปลอดภัย</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Client ID</p>
              <p className="font-mono text-slate-900">{client.clientId}</p>
            </div>
            {newSecret ? (
              <div className="space-y-2">
                <Label>Client Secret ใหม่</Label>
                <div className="flex gap-2">
                  <Input value={newSecret} readOnly className="font-mono" />
                  <Button onClick={() => copyToClipboard(newSecret)}>
                    <Copy className="w-4 h-4 mr-2" /> คัดลอก
                  </Button>
                </div>
                <p className="text-xs text-slate-500">กรุณาบันทึก Secret นี้ไว้ จะไม่สามารถดูได้อีกครั้ง</p>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-lg">
                <Key className="w-5 h-5 text-slate-400" />
                <p className="text-sm text-slate-600">คลิกปุ่ม "สร้าง Secret ใหม่" เพื่อหมุนเวียน Client Secret</p>
              </div>
            )}
          </div>
          <DialogFooter>
            {newSecret ? (
              <>
                <Button variant="outline" onClick={() => { setShowSecret(false); setNewSecret(""); }}>ปิด</Button>
                <Button onClick={() => copyToClipboard(newSecret)}><Copy className="w-4 h-4 mr-2" /> คัดลอก Secret</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setShowSecret(false)}>ยกเลิก</Button>
                <Button onClick={handleRotate}><RefreshCw className="w-4 h-4 mr-2" /> สร้าง Secret ใหม่</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
