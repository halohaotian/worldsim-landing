let sessionId: string | null = null;
let clickBuffer: Array<{ element: string; path: string }> = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function getSessionId(): string {
  if (sessionId) return sessionId;
  if (typeof window !== "undefined") {
    sessionId = sessionStorage.getItem("ws_sid");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("ws_sid", sessionId);
    }
  }
  return sessionId ?? "";
}

export function trackPageView() {
  if (typeof window === "undefined") return;
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "pageview",
      path: window.location.pathname,
      referrer: document.referrer,
      session_id: getSessionId(),
    }),
  }).catch(() => {});
}

export function trackClick(element: string) {
  if (typeof window === "undefined") return;
  clickBuffer.push({ element, path: window.location.pathname });
  if (clickBuffer.length >= 10) {
    flushClicks();
  } else if (!flushTimer) {
    flushTimer = setTimeout(flushClicks, 5000);
  }
}

function flushClicks() {
  if (flushTimer) { clearTimeout(flushTimer); flushTimer = null; }
  if (clickBuffer.length === 0) return;
  const events = [...clickBuffer];
  clickBuffer = [];
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "click_batch",
      events,
      session_id: getSessionId(),
    }),
  }).catch(() => {});
}
