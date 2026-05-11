"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { mockTitles } from "@/data/mockData";
import { TEXT_LABEL } from "@/constant/text";
import { SettingsHeader } from "./SettingsHeader";
import { SETTINGS_TABS } from "./Settings.config";

function SettingRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <span className="text-sm font-medium text-slate-700 min-w-[200px]">{label}</span>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}

export function SettingsContent() {
  const [enforceMfa, setEnforceMfa] = useState(false);
  const [allowRefresh, setAllowRefresh] = useState(true);
  const [thaidEnabled, setThaidEnabled] = useState(false);
  const [mfaMethod, setMfaMethod] = useState("totp");
  const [environment, setEnvironment] = useState("production");

  return (
    <div className="space-y-6">
      <SettingsHeader />

      <Tabs defaultValue="password" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {SETTINGS_TABS.map((t) => (
            <TabsTrigger key={t.key} value={t.key}>{t.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="password" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base">นโยบายรหัสผ่าน</CardTitle></CardHeader>
            <CardContent>
              <SettingRow label="ความยาวขั้นต่ำ (ตัวอักษร)">
                <Input type="number" defaultValue={8} className="w-24 text-right" />
              </SettingRow>
              <SettingRow label="อายุรหัสผ่าน (วัน)">
                <Input type="number" defaultValue={90} className="w-24 text-right" />
              </SettingRow>
              <SettingRow label="จำนวนรหัสผ่านเก่าที่ห้ามซ้ำ">
                <Input type="number" defaultValue={5} className="w-24 text-right" />
              </SettingRow>
              <SettingRow label="ต้องมีตัวพิมพ์ใหญ่">
                <Switch defaultChecked />
              </SettingRow>
              <SettingRow label="ต้องมีตัวพิมพ์เล็ก">
                <Switch defaultChecked />
              </SettingRow>
              <SettingRow label="ต้องมีตัวเลข">
                <Switch defaultChecked />
              </SettingRow>
              <SettingRow label="ต้องมีอักขระพิเศษ">
                <Switch />
              </SettingRow>
              <div className="flex justify-end mt-4">
                <Button>บันทึกการตั้งค่า</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mfa" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base">การตั้งค่า MFA</CardTitle></CardHeader>
            <CardContent>
              <SettingRow label="บังคับใช้ MFA">
                <Switch checked={enforceMfa} onCheckedChange={setEnforceMfa} />
              </SettingRow>
              <SettingRow label="วิธี MFA หลัก">
                <Select value={mfaMethod} onValueChange={setMfaMethod}>
                  <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="totp">TOTP (Google Authenticator)</SelectItem>
                    <SelectItem value="sms">SMS OTP</SelectItem>
                    <SelectItem value="email">Email OTP</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <div className="flex justify-end mt-4">
                <Button>บันทึกการตั้งค่า</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="session" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base">การตั้งค่า Session</CardTitle></CardHeader>
            <CardContent>
              <SettingRow label="Session Timeout (นาที)">
                <Input type="number" defaultValue={30} className="w-24 text-right" />
              </SettingRow>
              <SettingRow label="Inactivity Timeout (นาที)">
                <Input type="number" defaultValue={15} className="w-24 text-right" />
              </SettingRow>
              <SettingRow label="Concurrent Sessions สูงสุด">
                <Input type="number" defaultValue={3} className="w-24 text-right" />
              </SettingRow>
              <SettingRow label="จดจำอุปกรณ์">
                <Switch defaultChecked />
              </SettingRow>
              <div className="flex justify-end mt-4">
                <Button>บันทึกการตั้งค่า</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="token" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base">การตั้งค่า Token</CardTitle></CardHeader>
            <CardContent>
              <SettingRow label="Access Token Expiry (วินาที)">
                <Input type="number" defaultValue={3600} className="w-32 text-right" />
              </SettingRow>
              <SettingRow label="Refresh Token Expiry (วัน)">
                <Input type="number" defaultValue={30} className="w-32 text-right" />
              </SettingRow>
              <SettingRow label="ID Token Expiry (วินาที)">
                <Input type="number" defaultValue={3600} className="w-32 text-right" />
              </SettingRow>
              <SettingRow label="อนุญาต Refresh Token">
                <Switch checked={allowRefresh} onCheckedChange={setAllowRefresh} />
              </SettingRow>
              <div className="flex justify-end mt-4">
                <Button>บันทึกการตั้งค่า</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thaid" className="mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base">การตั้งค่า ThaID</CardTitle></CardHeader>
            <CardContent>
              <SettingRow label="เปิดใช้งาน ThaID">
                <Switch checked={thaidEnabled} onCheckedChange={setThaidEnabled} />
              </SettingRow>
              <SettingRow label="Client ID (ThaID)">
                <Input placeholder="กรอก Client ID" className="w-64" />
              </SettingRow>
              <SettingRow label="สภาพแวดล้อม">
                <Select value={environment} onValueChange={setEnvironment}>
                  <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="sandbox">Sandbox</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <SettingRow label="เชื่อมโยงบัญชีอัตโนมัติ">
                <Switch />
              </SettingRow>
              <div className="flex justify-end mt-4">
                <Button>บันทึกการตั้งค่า</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="titles" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">จัดการคำนำหน้าชื่อ</CardTitle>
                <Button size="sm"><Plus className="w-4 h-4" /> เพิ่มคำนำหน้า</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left px-6 py-3 font-medium text-slate-600">คำนำหน้า</th>
                    <th className="text-left px-6 py-3 font-medium text-slate-600">สถานะ</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {mockTitles.map((t) => (
                    <tr key={t.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{t.name}</td>
                      <td className="px-6 py-4">
                        <Badge variant={t.status === "active" ? "success" : "secondary"}>
                          {t.status === "active" ? TEXT_LABEL.STATUS_ACTIVE : TEXT_LABEL.STATUS_INACTIVE}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <Button variant="ghost" size="icon"><Pencil className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
