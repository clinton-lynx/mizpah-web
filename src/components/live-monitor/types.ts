export type LiveAlertType = "watchlist" | "missing" | "medical";

export type LiveAlertReport = {
  report_type: "watchlist" | "missing";
  threat_level?: string | null;
  reason?: string | null;
  last_seen_location?: string | null;
  description?: string | null;
  flagged_by?: string | null;
};

export type LiveMatchPayload = {
  profileName: string;
  profileType?: LiveAlertType | string;
  reports: LiveAlertReport[];
  location: string;
  confidence: number | string | null;
  timestamp: string;
};

export type LiveAlert = {
  id: string;
  name: string;
  type: LiveAlertType;
  location: string;
  confidence: number | string | null;
  timestamp: string;
  subtitle?: string | null;
  reportType?: LiveAlertReport["report_type"] | null;
  reports?: LiveAlertReport[];
  threatLevel?: string | null;
  reason?: string | null;
  lastSeenLocation?: string | null;
  description?: string | null;
  flaggedBy?: string | null;
};
