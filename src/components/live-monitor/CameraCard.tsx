type CameraStatus = "live" | "match";

export interface CameraCardProps {
  name: string;
  code: string;
  status: CameraStatus;
  alertLabel?: string;
  alertDetails?: string;
  recordLabel?: string;
  className?: string;
  accent?: "primary" | "error";
}

export default function CameraCard({
  name,
  code,
  status,
  alertLabel,
  alertDetails,
  recordLabel = `${code} • REC`,
  className = "",
  accent = "primary",
}: CameraCardProps) {
  const isMatch = status === "match";

  return (
    <article
      className={`group relative overflow-hidden rounded-[28px] border bg-surface-container-lowest shadow-[0_0_0_1px_rgba(134,148,144,0.12)] transition-all ${
        isMatch
          ? "border-error/80 shadow-[0_0_0_1px_rgba(255,180,171,0.18),0_0_34px_rgba(255,180,171,0.15)]"
          : "border-outline-variant/80 hover:border-primary/70 hover:shadow-[0_0_0_1px_rgba(89,219,199,0.22),0_0_30px_rgba(89,219,199,0.08)]"
      } ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(57,71,102,0.35),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(89,219,199,0.1),transparent_30%),linear-gradient(180deg,rgba(16,20,21,0.65),rgba(11,15,16,0.95))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,10,0.1),rgba(8,10,10,0.45)_60%,rgba(8,10,10,0.88))]" />

      <div className="relative flex h-full min-h-[240px] flex-col p-5">
        <div className="mb-auto flex items-start justify-between gap-3">
          <div />
          <div
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-label-mono text-[11px] uppercase tracking-[0.05em] ${
              isMatch
                ? "bg-error-container text-[#ffd6d2]"
                : "bg-primary-container text-on-primary-container"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${isMatch ? "bg-error animate-pulse" : "bg-primary animate-pulse"}`} />
            {isMatch ? alertLabel ?? "Match" : "Live"}
          </div>
        </div>

        {isMatch ? (
          <div className="pointer-events-none absolute inset-x-[18%] top-1/2 -translate-y-1/2">
            <div className="relative mx-auto h-32 rounded-2xl border border-error/80 bg-error/5 shadow-[0_0_0_1px_rgba(255,180,171,0.25),0_0_28px_rgba(255,0,0,0.14)]">
              <div className="absolute -top-7 left-3 rounded-full border border-error/60 bg-surface-container-lowest px-2 py-1 font-label-mono text-[11px] uppercase tracking-[0.05em] text-error">
                {alertDetails ?? "97% CONF"}
              </div>
              <div className="absolute -bottom-7 left-3 rounded-full border border-error/60 bg-surface-container-lowest px-2 py-1 font-label-mono text-[11px] uppercase tracking-[0.05em] text-error">
                ID: #4092
              </div>
            </div>
          </div>
        ) : null}

        <div className="relative mt-auto rounded-[20px] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.8))] px-1 pb-1 pt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-white">
                {name}
              </h3>
              <div className="mt-1 font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                {code}
              </div>
            </div>
            <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
              {recordLabel}
            </div>
          </div>
        </div>

        {isMatch ? (
          <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full border border-error/50 bg-error-container/75 px-3 py-1.5 font-label-mono text-[11px] uppercase tracking-[0.05em] text-[#ffd6d2]">
            <span className="h-2 w-2 rounded-full bg-error" />
            Confirmed Alert
          </div>
        ) : (
          <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full border border-primary/35 bg-surface-container-high/80 px-3 py-1.5 font-label-mono text-[11px] uppercase tracking-[0.05em] text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {accent === "primary" ? "Streaming" : "Watch"}
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_50%_100%,rgba(89,219,199,0.12),transparent_50%)]" />

        {!isMatch ? (
          <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-transparent transition-colors group-hover:border-primary/20" />
        ) : null}
      </div>
    </article>
  );
}
