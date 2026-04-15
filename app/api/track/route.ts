import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();
    if (body.type === "pageview") {
      await supabase.from("page_views").insert({
        path: body.path,
        referrer: body.referrer,
        session_id: body.session_id,
        user_agent: request.headers.get("user-agent"),
      });
    } else if (body.type === "click_batch") {
      const rows = body.events.map((e: { element: string; path: string }) => ({
        element: e.element,
        path: e.path,
        session_id: body.session_id,
      }));
      await supabase.from("click_events").insert(rows);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
