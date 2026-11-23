"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";

function subscribeToMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function DeveloperTags({ tags }: { tags: string[] }) {
  const reduceMotion = useSyncExternalStore(subscribeToMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false);
  const [frame, setFrame] = useState({ index: 0, length: tags[0]?.length ?? 0, deleting: false });
  const current = tags[frame.index] ?? tags[0] ?? "Developer";

  useEffect(() => {
    if (reduceMotion || tags.length < 2) return;
    const complete = frame.length === current.length;
    const delay = frame.deleting ? 40 : complete ? 1000 : frame.length === 0 ? 250 : 85;
    const timer = window.setTimeout(() => {
      setFrame((previous) => {
        if (previous.deleting) {
          return previous.length > 0
            ? { ...previous, length: previous.length - 1 }
            : { index: (previous.index + 1) % tags.length, length: 0, deleting: false };
        }
        return previous.length === current.length
          ? { ...previous, deleting: true }
          : { ...previous, length: previous.length + 1 };
      });
    }, delay);
    return () => window.clearTimeout(timer);
  }, [current, frame, reduceMotion, tags.length]);

  return (
    <div className="mb-4 ps-1 flex items-center gap-2 font-mono text-lg sm:text-xl lg:text-2xl font-semibold tracking-[0.12em] text-technical uppercase max-sm:mb-3 max-sm:tracking-[0.1em]">
      <span className="sr-only">{tags.join(", ")}</span>
      <span aria-hidden="true" className="min-h-6 min-w-0 break-words leading-6">
        {reduceMotion ? tags[0] : current.slice(0, frame.length)}
        {!reduceMotion && <span className="inline-block h-[1em] w-px translate-y-0.5 bg-current" />}
      </span>

    </div>
  );
}
