import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { REPORTS_CONFIG } from "./Reports.config";

export function ReportsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{REPORTS_CONFIG.title}</h1>
        <p className="text-slate-600 mt-1">{REPORTS_CONFIG.description}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> PDF</Button>
        <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Excel</Button>
      </div>
    </div>
  );
}
