import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ORGANIZATIONS_CONFIG } from "./Organizations.config";

export function OrganizationsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{ORGANIZATIONS_CONFIG.title}</h1>
        <p className="text-slate-600">{ORGANIZATIONS_CONFIG.description}</p>
      </div>
      <Button>
        <Plus className="w-4 h-4 mr-2" /> เพิ่มหน่วยงาน
      </Button>
    </div>
  );
}
