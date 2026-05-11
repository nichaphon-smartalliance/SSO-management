"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { mockOrganizations } from "@/data/mockData";
import { TEXT_BUTTON } from "@/constant/text";

const GRANT_TYPES = ["authorization_code", "refresh_token", "client_credentials", "implicit"];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ClientCreateDialog({ open, onClose }: Props) {
  const [form, setForm] = useState({
    clientId: "", clientName: "", organizationId: "",
    redirectUris: "", scopes: "", grantTypes: [] as string[],
    effectiveDate: "", expiryDate: "",
  });

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const toggleGrantType = (type: string) => setForm((prev) => ({
    ...prev,
    grantTypes: prev.grantTypes.includes(type)
      ? prev.grantTypes.filter((t) => t !== type)
      : [...prev.grantTypes, type],
  }));

  const handleSubmit = () => {
    console.log("Creating client:", form);
    onClose();
    setForm({ clientId: "", clientName: "", organizationId: "", redirectUris: "", scopes: "", grantTypes: [], effectiveDate: "", expiryDate: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>เพิ่มระบบงานใหม่</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientId">Client ID *</Label>
              <Input id="clientId" placeholder="my-system" value={form.clientId} onChange={(e) => set("clientId", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>หน่วยงาน *</Label>
              <Select value={form.organizationId} onValueChange={(v) => set("organizationId", v)}>
                <SelectTrigger><SelectValue placeholder="เลือกหน่วยงาน" /></SelectTrigger>
                <SelectContent>
                  {mockOrganizations.filter((o) => o.status === "active").map((o) => (
                    <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientName">ชื่อระบบ *</Label>
            <Input id="clientName" placeholder="ระบบบริหารจัดการ..." value={form.clientName} onChange={(e) => set("clientName", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="redirectUris">Redirect URIs * (หนึ่ง URI ต่อหนึ่งบรรทัด)</Label>
            <Textarea id="redirectUris" placeholder={"https://example.com/callback\nhttps://example.com/silent-renew"} rows={3} value={form.redirectUris} onChange={(e) => set("redirectUris", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="scopes">Scopes * (คั่นด้วยช่องว่าง)</Label>
            <Input id="scopes" placeholder="openid profile email read write" value={form.scopes} onChange={(e) => set("scopes", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Grant Types *</Label>
            <div className="flex flex-wrap gap-3">
              {GRANT_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300"
                    checked={form.grantTypes.includes(type)}
                    onChange={() => toggleGrantType(type)}
                  />
                  <span className="text-sm text-slate-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="effectiveDate">วันที่มีผล *</Label>
              <Input id="effectiveDate" type="date" value={form.effectiveDate} onChange={(e) => set("effectiveDate", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">วันหมดอายุ *</Label>
              <Input id="expiryDate" type="date" value={form.expiryDate} onChange={(e) => set("expiryDate", e.target.value)} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{TEXT_BUTTON.CANCEL}</Button>
          <Button onClick={handleSubmit}>สร้างระบบงาน</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
