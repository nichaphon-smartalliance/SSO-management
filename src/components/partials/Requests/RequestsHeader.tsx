import { REQUESTS_CONFIG } from "./Requests.config";

export function RequestsHeader() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">{REQUESTS_CONFIG.title}</h1>
      <p className="text-slate-600">{REQUESTS_CONFIG.description}</p>
    </div>
  );
}
