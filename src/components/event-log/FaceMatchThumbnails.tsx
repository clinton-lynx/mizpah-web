"use client";

import MaterialIcon from "@/components/shared/MaterialIcon";

export default function FaceMatchThumbnails({
  tone = "primary",
}: {
  tone?: "primary" | "error" | "tertiary" | "muted";
}) {
  const toneClass =
    tone === "error"
      ? "bg-[linear-gradient(135deg,rgba(185,70,70,0.95),rgba(90,18,18,0.95))]"
      : tone === "tertiary"
        ? "bg-[linear-gradient(135deg,rgba(205,126,76,0.95),rgba(97,46,11,0.95))]"
        : tone === "muted"
          ? "bg-[linear-gradient(135deg,rgba(93,101,104,0.95),rgba(34,38,40,0.95))]"
          : "bg-[linear-gradient(135deg,rgba(0,168,150,0.95),rgba(19,60,56,0.95))]";

  return (
    <div className="flex shrink-0 items-center gap-2">
      <div className={`flex h-12 w-12 items-center justify-center rounded-lg border border-outline-variant ${toneClass}`}>
        <span className="text-sm font-bold text-white">ID</span>
      </div>
      <MaterialIcon name="chevron_right" className="text-[22px] text-on-surface-variant" />
      <div className={`flex h-12 w-12 items-center justify-center rounded-lg border border-outline-variant ${toneClass}`}>
        <MaterialIcon name="face" className="text-[18px] text-white/90" />
      </div>
    </div>
  );
}
