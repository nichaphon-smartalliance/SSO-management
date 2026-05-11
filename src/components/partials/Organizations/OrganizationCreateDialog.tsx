"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ORG_TYPES = ["กระทรวง", "กรม", "องค์กรปกครองส่วนท้องถิ่น", "หน่วยงานรัฐ", "รัฐวิสาหกิจ"];

export function OrganizationCreateDialog({ open, onClose }: Props) {
  const [form, setForm] = useState({ code: "", name: "", nameEn: "", type: "", contactPerson: "", email: "", phone: "" });

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    console.log("Creating org:", form);
    onClose();
    setForm({ code: "", name: "", nameEn: "", type: "", contactPerson: "", email: "", phone: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>เพิ่มหน่วยงานใหม่</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="code">รหัสหน่วยงาน *</Label>
            <Input id="code" placeholder="เช่น MOI, MOF" value={form.code} onChange={(e) => set("code", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>ประเภทหน่วยงาน *</Label>
            <Select value={form.type} onValueChange={(v) => set("type", v)}>
              <SelectTrigger><SelectValue placeholder="เลือกประเภท" /></SelectTrigger>
              <SelectContent>
                {ORG_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="name">ชื่อหน่วยงาน (ภาษาไทย) *</Label>
            <Input id="name" placeholder="เช่น กระทรวงมหาดไทย" value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="nameEn">ชื่อหน่วยงาน (ภาษาอังกฤษ) *</Label>
            <Input id="nameEn" placeholder="เช่น Ministry of Interior" value={form.nameEn} onChange={(e) => set("nameEn", e.target.value)} />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="contactPerson">ผู้ติดต่อ *</Label>
            <Input id="contactPerson" placeholder="ชื่อ-นามสกุล" value={form.contactPerson} onChange={(e) => set("contactPerson", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">อีเมล *</Label>
            <Input id="email" type="email" placeholder="contact@example.go.th" value={form.email} onChange={(e) => set("email", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
            <Input id="phone" placeholder="02-XXX-XXXX" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
          <Button onClick={handleSubmit}>สร้างหน่วยงาน</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
