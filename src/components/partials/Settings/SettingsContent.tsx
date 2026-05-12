"use client";

import { useState } from "react";
import {
  Save, Lock, Shield, Key, CheckCircle, Award,
  Search, Plus, Edit,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Badge } from "@/components/ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { mockTitles } from "@/data/mockData";
import { TEXT_LABEL, TEXT_BUTTON } from "@/constant/text";
import type { Title } from "@/types/app";
import {
  SETTINGS_CONFIG,
  SETTINGS_TABS,
  DEFAULT_PASSWORD_POLICY,
  DEFAULT_MFA_POLICY,
  DEFAULT_TOKEN_POLICY,
  DEFAULT_THAID_SETTINGS,
} from "./Settings.config";

// ─── Reusable layout pieces ───────────────────────────────────────────────────

/** Highlighted row for important on/off toggles */
function ToggleBox({
  id, label, description, checked, onCheckedChange, highlight = false,
}: {
  id: string; label: string; description?: string;
  checked: boolean; onCheckedChange: (v: boolean) => void; highlight?: boolean;
}) {
  const bg = highlight
    ? "bg-indigo-50 border-indigo-200"
    : "bg-slate-50 border-slate-200";
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${bg}`}>
      <div>
        <Label htmlFor={id} className="cursor-pointer font-medium">{label}</Label>
        {description && <p className="text-sm text-slate-600 mt-1">{description}</p>}
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

/** Number input with optional hint */
function NumberField({
  id, label, value, hint,
  onChange,
}: {
  id: string; label: string; value: string; hint?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type="number" value={value} onChange={(e) => onChange(e.target.value)} />
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

/** Standard save button row */
function SaveRow({ section }: { section: string }) {
  return (
    <div className="flex justify-end pt-4">
      <Button onClick={() => console.log(`Saving ${section}...`)}>
        <Save className="w-4 h-4 mr-2" /> บันทึกการตั้งค่า
      </Button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SettingsContent() {

  // Password
  const [passwordPolicy, setPasswordPolicy] = useState(DEFAULT_PASSWORD_POLICY);

  // MFA
  const [mfaPolicy, setMfaPolicy] = useState(DEFAULT_MFA_POLICY);
  const toggleMfaMethod = (method: string, on: boolean) =>
    setMfaPolicy((p) => ({
      ...p,
      allowedMethods: on
        ? [...p.allowedMethods, method]
        : p.allowedMethods.filter((m) => m !== method),
    }));

  // Token
  const [tokenPolicy, setTokenPolicy] = useState(DEFAULT_TOKEN_POLICY);

  // ThaID
  const [thaidSettings, setThaidSettings] = useState(DEFAULT_THAID_SETTINGS);

  // Titles
  const [titles, setTitles] = useState<Title[]>(mockTitles);
  const [titleSearch, setTitleSearch] = useState("");
  const [titleStatus, setTitleStatus] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<Title | null>(null);
  const [titleForm, setTitleForm] = useState({ name: "", status: "active" as "active" | "inactive" });

  const filteredTitles = titles.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(titleSearch.toLowerCase());
    const matchStatus = titleStatus === "all" || t.status === titleStatus;
    return matchSearch && matchStatus;
  });

  const handleAddTitle = () => {
    const newTitle: Title = {
      id: String(Date.now()),
      name: titleForm.name,
      status: titleForm.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTitles([...titles, newTitle]);
    setShowAddDialog(false);
    setTitleForm({ name: "", status: "active" });
  };

  const handleEditTitle = () => {
    if (!selectedTitle) return;
    setTitles(titles.map((t) =>
      t.id === selectedTitle.id ? { ...t, name: titleForm.name, status: titleForm.status, updatedAt: new Date().toISOString() } : t
    ));
    setShowEditDialog(false);
    setSelectedTitle(null);
    setTitleForm({ name: "", status: "active" });
  };

  const openEdit = (title: Title) => {
    setSelectedTitle(title);
    setTitleForm({ name: title.name, status: title.status });
    setShowEditDialog(true);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{SETTINGS_CONFIG.title}</h1>
        <p className="text-slate-600 mt-1">{SETTINGS_CONFIG.description}</p>
      </div>

      <Tabs defaultValue="password" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {SETTINGS_TABS.map((t) => (
            <TabsTrigger key={t.key} value={t.key}>{t.label}</TabsTrigger>
          ))}
        </TabsList>

        {/* ── Password ─────────────────────────────────────────────────── */}
        <TabsContent value="password" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" /> นโยบายรหัสผ่าน
              </CardTitle>
              <CardDescription>กำหนดข้อกำหนดและนโยบายสำหรับรหัสผ่านผู้ใช้</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NumberField
                  id="minLength" label="ความยาวขั้นต่ำ (ตัวอักษร)"
                  value={passwordPolicy.minLength}
                  onChange={(v) => setPasswordPolicy({ ...passwordPolicy, minLength: v })}
                />
                <NumberField
                  id="passwordExpiry" label="รหัสผ่านหมดอายุ (วัน)"
                  value={passwordPolicy.passwordExpiry}
                  onChange={(v) => setPasswordPolicy({ ...passwordPolicy, passwordExpiry: v })}
                />
                <NumberField
                  id="passwordHistory" label="จดจำรหัสผ่านเก่า (จำนวนครั้ง)"
                  value={passwordPolicy.passwordHistory}
                  onChange={(v) => setPasswordPolicy({ ...passwordPolicy, passwordHistory: v })}
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium text-slate-900">ข้อกำหนดรหัสผ่าน</h4>
                <div className="space-y-3">
                  {[
                    { id: "requireUppercase",    label: "ต้องมีตัวพิมพ์ใหญ่ (A-Z)",         key: "requireUppercase"    as const },
                    { id: "requireLowercase",    label: "ต้องมีตัวพิมพ์เล็ก (a-z)",         key: "requireLowercase"    as const },
                    { id: "requireNumbers",      label: "ต้องมีตัวเลข (0-9)",              key: "requireNumbers"      as const },
                    { id: "requireSpecialChars", label: "ต้องมีอักขระพิเศษ (!@#$%^&*)",   key: "requireSpecialChars" as const },
                  ].map(({ id, label, key }) => (
                    <div key={id} className="flex items-center justify-between">
                      <Label htmlFor={id} className="cursor-pointer">{label}</Label>
                      <Switch
                        id={id}
                        checked={passwordPolicy[key]}
                        onCheckedChange={(v) => setPasswordPolicy({ ...passwordPolicy, [key]: v })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <SaveRow section="password" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── MFA ──────────────────────────────────────────────────────── */}
        <TabsContent value="mfa" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" /> นโยบาย Multi-Factor Authentication
              </CardTitle>
              <CardDescription>กำหนดข้อกำหนด MFA สำหรับผู้ใช้ในระบบ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ToggleBox
                id="enforceMfa"
                label="บังคับใช้ MFA สำหรับผู้ใช้ทั้งหมด"
                description="ผู้ใช้ต้องตั้งค่า MFA ก่อนจึงจะสามารถเข้าใช้งานระบบได้"
                highlight={true}
                checked={mfaPolicy.enforceMfa}
                onCheckedChange={(v) => setMfaPolicy({ ...mfaPolicy, enforceMfa: v })}
              />

              <div className="space-y-2">
                <Label>วิธี MFA หลัก</Label>
                <Select value={mfaPolicy.mfaMethod} onValueChange={(v) => setMfaPolicy({ ...mfaPolicy, mfaMethod: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="totp">TOTP (Time-based OTP)</SelectItem>
                    <SelectItem value="email">Email OTP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <h4 className="font-medium text-slate-900">วิธี MFA ที่อนุญาต</h4>
                <div className="space-y-2">
                  {[
                    { value: "totp",  label: "TOTP (Authenticator App)", recommended: true },
                    { value: "email", label: "Email OTP",                recommended: false },
                  ].map(({ value, label, recommended }) => (
                    <label key={value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300"
                        checked={mfaPolicy.allowedMethods.includes(value)}
                        onChange={(e) => toggleMfaMethod(value, e.target.checked)}
                      />
                      <span className="text-sm text-slate-700">{label}</span>
                      {recommended && <Badge variant="secondary" className="ml-auto">แนะนำ</Badge>}
                    </label>
                  ))}
                </div>
              </div>

              <SaveRow section="mfa" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Token ────────────────────────────────────────────────────── */}
        <TabsContent value="token" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" /> นโยบาย Token
              </CardTitle>
              <CardDescription>กำหนดระยะเวลาและนโยบายของ OAuth 2.0 Tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NumberField
                  id="accessTokenExpiry" label="Access Token Expiry (วินาที)"
                  value={tokenPolicy.accessTokenExpiry}
                  hint="ค่าปกติ: 3600 (1 ชั่วโมง)"
                  onChange={(v) => setTokenPolicy({ ...tokenPolicy, accessTokenExpiry: v })}
                />
                <NumberField
                  id="refreshTokenExpiry" label="Refresh Token Expiry (วินาที)"
                  value={tokenPolicy.refreshTokenExpiry}
                  hint="ค่าปกติ: 2592000 (30 วัน)"
                  onChange={(v) => setTokenPolicy({ ...tokenPolicy, refreshTokenExpiry: v })}
                />
                <NumberField
                  id="idTokenExpiry" label="ID Token Expiry (วินาที)"
                  value={tokenPolicy.idTokenExpiry}
                  hint="ค่าปกติ: 3600 (1 ชั่วโมง)"
                  onChange={(v) => setTokenPolicy({ ...tokenPolicy, idTokenExpiry: v })}
                />
              </div>

              <ToggleBox
                id="allowRefreshToken"
                label="อนุญาต Refresh Token"
                description="อนุญาตให้ระบบงานใช้ Refresh Token เพื่อต่ออายุ Access Token"
                checked={tokenPolicy.allowRefreshToken}
                onCheckedChange={(v) => setTokenPolicy({ ...tokenPolicy, allowRefreshToken: v })}
              />

              <SaveRow section="token" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── ThaID ────────────────────────────────────────────────────── */}
        <TabsContent value="thaid" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> การเชื่อมต่อ ThaID
              </CardTitle>
              <CardDescription>กำหนดค่าการเชื่อมต่อกับระบบ ThaID</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ToggleBox
                id="thaidEnabled"
                label="เปิดใช้งาน ThaID"
                description="อนุญาตให้ผู้ใช้เข้าสู่ระบบด้วย ThaID"
                checked={thaidSettings.enabled}
                highlight={true}
                onCheckedChange={(v) => setThaidSettings({ ...thaidSettings, enabled: v })}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="thaidClientId">Client ID</Label>
                  <Input
                    id="thaidClientId"
                    value={thaidSettings.clientId}
                    onChange={(e) => setThaidSettings({ ...thaidSettings, clientId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Environment</Label>
                  <Select value={thaidSettings.environment} onValueChange={(v) => setThaidSettings({ ...thaidSettings, environment: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="sandbox">Sandbox</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <ToggleBox
                id="autoLinkAccounts"
                label="เชื่อมโยงบัญชีอัตโนมัติ"
                description="เชื่อมโยงบัญชีผู้ใช้กับ ThaID อัตโนมัติเมื่อเข้าสู่ระบบครั้งแรก"
                checked={thaidSettings.autoLinkAccounts}
                onCheckedChange={(v) => setThaidSettings({ ...thaidSettings, autoLinkAccounts: v })}
              />

              <SaveRow section="thaid" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Titles ───────────────────────────────────────────────────── */}
        <TabsContent value="titles" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" /> จัดการยศ/คำนำหน้า
                  </CardTitle>
                  <CardDescription>จัดการคำนำหน้าชื่อ ยศ และตำแหน่งสำหรับผู้ใช้ในระบบ</CardDescription>
                </div>
                <Button onClick={() => { setTitleForm({ name: "", status: "active" }); setShowAddDialog(true); }}>
                  <Plus className="w-4 h-4 mr-2" /> เพิ่มยศ/คำนำหน้า
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="ค้นหาคำนำหน้า..."
                    value={titleSearch}
                    onChange={(e) => setTitleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={titleStatus} onValueChange={setTitleStatus}>
                  <SelectTrigger><SelectValue placeholder="สถานะ" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="active">ใช้งาน</SelectItem>
                    <SelectItem value="inactive">ไม่ใช้งาน</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full table-fixed">
                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-200">
                      <th className="w-[60%] text-left py-3 px-4 text-sm font-medium text-slate-600">คำนำหน้า</th>
                      <th className="w-[20%] text-left py-3 px-4 text-sm font-medium text-slate-600">สถานะ</th>
                      <th className="w-[20%] text-right py-3 px-4 text-sm font-medium text-slate-600">การดำเนินการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTitles.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="py-8 text-center text-slate-400 text-sm">
                          {TEXT_LABEL.NO_DATA}
                        </td>
                      </tr>
                    ) : filteredTitles.map((t) => (
                      <tr key={t.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-sm text-slate-900">{t.name}</td>
                        <td className="py-3 px-4">
                          <Badge variant={t.status === "active" ? "success" : "destructive"}>
                            {t.status === "active" ? TEXT_LABEL.STATUS_ACTIVE : TEXT_LABEL.STATUS_INACTIVE}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm" onClick={() => openEdit(t)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ── Add Title Dialog ─────────────────────────────────────────── */}
      <Dialog open={showAddDialog} onOpenChange={() => setShowAddDialog(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>เพิ่มยศ/คำนำหน้า</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="addTitleName">ชื่อคำนำหน้า *</Label>
              <Input
                id="addTitleName"
                placeholder="เช่น นาย, นาง, นางสาว"
                value={titleForm.name}
                onChange={(e) => setTitleForm({ ...titleForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>สถานะ</Label>
              <Select
                value={titleForm.status}
                onValueChange={(v) => setTitleForm({ ...titleForm, status: v as "active" | "inactive" })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">ใช้งาน</SelectItem>
                  <SelectItem value="inactive">ไม่ใช้งาน</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>{TEXT_BUTTON.CANCEL}</Button>
            <Button onClick={handleAddTitle} disabled={!titleForm.name.trim()}>บันทึก</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit Title Dialog ────────────────────────────────────────── */}
      <Dialog open={showEditDialog} onOpenChange={() => setShowEditDialog(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>แก้ไขยศ/คำนำหน้า</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editTitleName">ชื่อคำนำหน้า *</Label>
              <Input
                id="editTitleName"
                value={titleForm.name}
                onChange={(e) => setTitleForm({ ...titleForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>สถานะ</Label>
              <Select
                value={titleForm.status}
                onValueChange={(v) => setTitleForm({ ...titleForm, status: v as "active" | "inactive" })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">ใช้งาน</SelectItem>
                  <SelectItem value="inactive">ไม่ใช้งาน</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>{TEXT_BUTTON.CANCEL}</Button>
            <Button onClick={handleEditTitle} disabled={!titleForm.name.trim()}>{TEXT_BUTTON.SAVE}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
