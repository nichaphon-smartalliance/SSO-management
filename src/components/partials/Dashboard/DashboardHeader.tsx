import { DASHBOARD_CONFIG } from "./Dashboard.config";

export function DashboardHeader() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">{DASHBOARD_CONFIG.title}</h1>
      <p className="text-slate-600">{DASHBOARD_CONFIG.description}</p>
    </div>
  );
}
