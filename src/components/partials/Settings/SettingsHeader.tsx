import { SETTINGS_CONFIG } from "./Settings.config";

export function SettingsHeader() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">{SETTINGS_CONFIG.title}</h1>
      <p className="text-slate-600">{SETTINGS_CONFIG.description}</p>
    </div>
  );
}
