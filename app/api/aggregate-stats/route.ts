import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateStr = yesterday.toISOString().split("T")[0];
  const start = `${dateStr}T00:00:00`;
  const end = `${dateStr}T23:59:59`;

  const [pv, uvData, regs, wl, clicks] = await Promise.all([
    supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", start).lte("created_at", end),
    supabase.from("page_views").select("session_id").gte("created_at", start).lte("created_at", end),
    supabase.from("profiles").select("id", { count: "exact", head: true }).gte("created_at", start).lte("created_at", end),
    supabase.from("waitlist").select("id", { count: "exact", head: true }).gte("created_at", start).lte("created_at", end),
    supabase.from("click_events").select("id", { count: "exact", head: true }).gte("created_at", start).lte("created_at", end),
  ]);

  const uniqueSessions = new Set(uvData.data?.map((r: any) => r.session_id)).size;

  await supabase.from("daily_stats").upsert({
    date: dateStr,
    page_views: pv.count ?? 0,
    unique_visitors: uniqueSessions,
    registrations: regs.count ?? 0,
    waitlist_joins: wl.count ?? 0,
    clicks: clicks.count ?? 0,
  }, { onConflict: "date" });

  return NextResponse.json({ ok: true, date: dateStr });
}
