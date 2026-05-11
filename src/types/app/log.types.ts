export interface AuditLog {
  id: string;
  timestamp: string;
  eventType: string;
  severity: "info" | "warning" | "error" | "critical";
  actor: string;
  actorRole: string;
  action: string;
  resource: string;
  resourceId: string;
  ipAddress: string;
  userAgent: string;
  status: "success" | "failure";
  details: string;
}
