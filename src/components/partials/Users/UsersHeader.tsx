import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { USERS_CONFIG } from "./Users.config";

export function UsersHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{USERS_CONFIG.title}</h1>
        <p className="text-slate-600 mt-1">{USERS_CONFIG.description}</p>
      </div>
      <Button>
        <Plus className="w-4 h-4 mr-2" /> เพิ่มผู้ใช้งาน
      </Button>
    </div>
  );
}
