import { PERMISSIONS_CONFIG } from "./Permissions.config";

export function PermissionsHeader() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">{PERMISSIONS_CONFIG.title}</h1>
      <p className="text-slate-600">{PERMISSIONS_CONFIG.description}</p>
    </div>
  );
}
