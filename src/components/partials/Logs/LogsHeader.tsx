import { LOGS_CONFIG } from "./Logs.config";

export function LogsHeader() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">{LOGS_CONFIG.title}</h1>
      <p className="text-slate-600 mt-1">{LOGS_CONFIG.description}</p>
    </div>
  );
}
