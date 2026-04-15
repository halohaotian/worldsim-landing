export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

export interface WaitlistEntry {
  id: number;
  user_id: string | null;
  email: string;
  status: "waiting" | "invited" | "active";
  source: string;
  created_at: string;
}

export interface DailyStats {
  date: string;
  page_views: number;
  unique_visitors: number;
  registrations: number;
  waitlist_joins: number;
  clicks: number;
}

export interface TrackEvent {
  type: "pageview" | "click";
  path?: string;
  referrer?: string;
  element?: string;
  session_id?: string;
}
