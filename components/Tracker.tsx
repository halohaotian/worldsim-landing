"use client";

import { useEffect } from "react";
import { trackPageView } from "@/lib/tracking";

export default function Tracker() {
  useEffect(() => {
    trackPageView();
  }, []);
  return null;
}
