"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { mockOrganizations, mockTitles } from "@/data/mockData";
import { TEXT_BUTTON } from "@/constant/text";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UserCreateDialog({ open, onClose }: Props) {
  const [form, setForm] = useState({
    username: "", citizenId: "", titleId: "", fullName: "",
    email: "", phone: "", organizationId: "",
  });

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    console.log("Creating user:", form);
    onClose();
    setForm({ username: "", citizenId: "", titleId: "", fullName: "", email: "", phone: "", organizationId: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>เพิ่มผู้ใช้งานใหม่</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="username">ชื่อผู้ใช้ *</Label>
            <Input id="username" placeholder="username" value={form.username} onChange={(e) => set("username", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="citizenId">เลขบัตรประชาชน *</Label>
            <Input id="citizenId" placeholder="X-XXXX-XXXXX-XX-X" value={form.citizenId} onChange={(e) => set("citizenId", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>ยศ/คำนำหน้า</Label>
            <Select value={form.titleId} onValueChange={(v) => set("titleId", v)}>
              <SelectTrigger><SelectValue placeholder="เลือกยศ/คำนำหน้า" /></SelectTrigger>
              <SelectContent>
                {mockTitles.filter((t) => t.status === "active").map((t) => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ-นามสกุล *</Label>
            <Input id="fullName" placeholder="ชื่อ นามสกุล (ไม่รวมยศ/คำนำหน้า)" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">อีเมล *</Label>
            <Input id="email" type="email" placeholder="email@example.go.th" value={form.email} onChange={(e) => set("email", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
            <Input id="phone" placeholder="089-XXX-XXXX" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
          <div className="col-span-2 space-y-2">
            <Label>หน่วยงาน *</Label>
            <Select value={form.organizationId} onValueChange={(v) => set("organizationId", v)}>
              <SelectTrigger><SelectValue placeholder="เลือกหน่วยงาน" /></SelectTrigger>
              <SelectContent>
                {mockOrganizations.filter((o) => o.status === "active").map((o) => (
                  <SelectItem key={o.id} value={o.id}>{o.name} ({o.code})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{TEXT_BUTTON.CANCEL}</Button>
          <Button onClick={handleSubmit}>สร้างผู้ใช้งาน</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
