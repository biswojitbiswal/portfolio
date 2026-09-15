"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

const REFRESH_INTERVAL = 15_000;

export function ContentRefresh({ initialRevision, section = "hero" }: { initialRevision: string | null; section?: "hero" | "about" | "capabilities" | "experience" }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    let stopped = false;
    let inFlight = false;
    let controller: AbortController | undefined;

    const checkForChanges = async () => {
      if (stopped || inFlight || pending || !navigator.onLine || document.visibilityState !== "visible") return;
      inFlight = true;
      controller = new AbortController();
      const timeout = window.setTimeout(() => controller?.abort(), 10_000);
      try {
        const response = await fetch(`/api/content-revision?section=${section}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) return;
        const data: unknown = await response.json();
        if (!data || typeof data !== "object" || !("revision" in data)) return;
        const revision = data.revision;
        if (revision !== null && typeof revision !== "string") return;
        if (!stopped && revision !== initialRevision) {
          startTransition(() => router.refresh());
        }
      } catch {
        // Keep the current content on network failure; retry on the next check.
      } finally {
        window.clearTimeout(timeout);
        inFlight = false;
      }
    };

    const check = () => { void checkForChanges(); };
    const timer = window.setInterval(check, REFRESH_INTERVAL);
    window.addEventListener("online", check);
    document.addEventListener("visibilitychange", check);
    return () => {
      stopped = true;
      controller?.abort();
      window.clearInterval(timer);
      window.removeEventListener("online", check);
      document.removeEventListener("visibilitychange", check);
    };
  }, [initialRevision, section, pending, router]);

  return null;
}
