import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CLIENTS_CONFIG } from "./Clients.config";

export function ClientsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{CLIENTS_CONFIG.title}</h1>
        <p className="text-slate-600">{CLIENTS_CONFIG.description}</p>
      </div>
      <Button>
        <Plus className="w-4 h-4 mr-2" /> เพิ่มระบบงาน
      </Button>
    </div>
  );
}
