"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { mockTitles } from "@/data/mockData";

function RowLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-medium text-slate-700 min-w-[200px]">{children}</span>;
}

function SettingRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <RowLabel>{label}</RowLabel>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const [enforceMfa, setEnforceMfa] = useState(false);
  const [allowRefresh, setAllowRefresh] = useState(true);
  const [thaidEnabled, setThaidEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">การตั้งค่าระบบ</h1>
        <p className="text-sm text-slate-500 mt-1">กำหนดนโยบายและการตั้งค่าความปลอดภัย</p>
      </div>

      <Tabs defaultValue="password">
        <TabsList>
          <TabsTrigger value="password">รหัสผ่าน</TabsTrigger>
          <TabsTrigger value="mfa">MFA</TabsTrigger>
          <TabsTrigger value="session">Session</TabsTrigger>
          <TabsTrigger value="token">Token</TabsTrigger>
          <TabsTrigger value="thaid">ThaID</TabsTrigger>
          <TabsTrigger value="titles">คำนำหน้า</TabsTrigger>
        </TabsList>

        <TabsContent value="password">
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

        <TabsContent value="mfa">
          <Card>
            <CardHeader><CardTitle className="text-base">การตั้งค่า MFA</CardTitle></CardHeader>
            <CardContent>
              <SettingRow label="บังคับใช้ MFA">
                <Switch checked={enforceMfa} onCheckedChange={setEnforceMfa} />
              </SettingRow>
              <SettingRow label="วิธี MFA หลัก">
                <select className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>TOTP (Google Authenticator)</option>
                  <option>SMS OTP</option>
                  <option>Email OTP</option>
                </select>
              </SettingRow>
              <div className="flex justify-end mt-4">
                <Button>บันทึกการตั้งค่า</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="session">
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

        <TabsContent value="token">
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

        <TabsContent value="thaid">
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
                <select className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Production</option>
                  <option>Staging</option>
                  <option>Sandbox</option>
                </select>
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

        <TabsContent value="titles">
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
                          {t.status === "active" ? "ใช้งาน" : "ไม่ใช้งาน"}
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
