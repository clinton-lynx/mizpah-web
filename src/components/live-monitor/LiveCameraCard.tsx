"use client";

import { useEffect, useRef, useState } from "react";

import { cropFaceFromVideo, detectFace, loadFaceDetectionModels } from "@/lib/faceDetection";
import { scanFace } from "@/lib/api";

type ScanStatus = "scanning" | "checking" | "matched" | "error";

type ScanResponse = {
  matched?: boolean;
  matchFound?: boolean;
  confidence?: number | string;
  profile?: {
    name?: string;
  } | null;
  name?: string;
};

const statusConfig: Record<ScanStatus, { label: string; tone: string; dot: string }> = {
  scanning: {
    label: "SCANNING...",
    tone: "text-[#59dbc7]",
    dot: "bg-[#59dbc7] shadow-[0_0_0_4px_rgba(89,219,199,0.16)]",
  },
  checking: {
    label: "FACE DETECTED — CHECKING...",
    tone: "text-amber-300",
    dot: "bg-amber-300 shadow-[0_0_0_4px_rgba(252,211,77,0.16)]",
  },
  matched: {
    label: "MATCH FOUND",
    tone: "text-[#ff6b6b]",
    dot: "bg-[#ff6b6b] shadow-[0_0_0_4px_rgba(255,107,107,0.16)]",
  },
  error: {
    label: "CAMERA UNAVAILABLE",
    tone: "text-[#ff6b6b]",
    dot: "bg-[#ff6b6b] shadow-[0_0_0_4px_rgba(255,107,107,0.16)]",
  },
};

function formatConfidence(confidence: ScanResponse["confidence"]) {
  if (confidence == null) {
    return null;
  }

  if (typeof confidence === "number") {
    if (confidence <= 1) {
      return `${Math.round(confidence * 100)}%`;
    }

    return `${Math.round(confidence)}%`;
  }

  return String(confidence);
}

function resolveMatchSummary(response: ScanResponse) {
  const name = response.profile?.name ?? response.name ?? "Match found";
  const confidence = formatConfidence(response.confidence);

  return confidence ? `${name} • ${confidence}` : name;
}

export interface LiveCameraCardProps {
  name: string;
  code: string;
  recordLabel?: string;
  className?: string;
}

export default function LiveCameraCard({
  name,
  code,
  recordLabel = `${code} • LIVE`,
  className = "",
}: LiveCameraCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanInFlightRef = useRef(false);
  const matchedTimeoutRef = useRef<number | null>(null);
  const statusRef = useRef<ScanStatus>("scanning");
  const [status, setStatus] = useState<ScanStatus>("scanning");
  const [cameraReady, setCameraReady] = useState(false);
  const [modelsReady, setModelsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [matchSummary, setMatchSummary] = useState<string | null>(null);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        await loadFaceDetectionModels();
        if (!cancelled) {
          setModelsReady(true);
        }
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(err instanceof Error ? err.message : "Failed to load face models");
        }
      }
    })();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!cameraReady || !modelsReady) {
      return;
    }

    let cancelled = false;

    const runScan = async () => {
      if (cancelled || scanInFlightRef.current || statusRef.current === "matched") {
        return;
      }

      const video = videoRef.current;
      if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        return;
      }

      scanInFlightRef.current = true;
      setStatus("checking");

      try {
        const detection = await detectFace(video);

        if (cancelled) {
          return;
        }

        if (!detection) {
          setStatus("scanning");
          return;
        }

        const base64Face = cropFaceFromVideo(video, detection);
        if (!base64Face) {
          setStatus("scanning");
          return;
        }

        const response = (await scanFace(base64Face, "passive")) as ScanResponse;

        if (cancelled) {
          return;
        }

        if (response.matched ?? response.matchFound) {
          setStatus("matched");
          setMatchSummary(resolveMatchSummary(response));
          setErrorMessage(null);

          if (matchedTimeoutRef.current) {
            window.clearTimeout(matchedTimeoutRef.current);
          }

          matchedTimeoutRef.current = window.setTimeout(() => {
            if (!cancelled) {
              setStatus("scanning");
              setMatchSummary(null);
            }
          }, 1500);
          return;
        }

        setStatus("scanning");
        setMatchSummary(null);
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(err instanceof Error ? err.message : "Unknown scan error");
        }
      } finally {
        scanInFlightRef.current = false;
      }
    };

    void runScan();
    const interval = window.setInterval(() => {
      void runScan();
    }, 2000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [cameraReady, modelsReady]);

  useEffect(() => {
    return () => {
      if (matchedTimeoutRef.current) {
        window.clearTimeout(matchedTimeoutRef.current);
      }
    };
  }, []);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });

      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = stream;

      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        await video.play().catch(() => undefined);
      }

      setErrorMessage(null);
      setStatus("scanning");
      setCameraReady(true);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? `${err.name}: ${err.message}` : "Camera start failed");
    }
  }

  const currentStatus = statusConfig[status];
  const isMatched = status === "matched";
  const borderTone =
    status === "error" || status === "matched"
      ? "border-error/80 shadow-[0_0_0_1px_rgba(255,180,171,0.18),0_0_34px_rgba(255,180,171,0.12)]"
      : cameraReady
        ? "border-primary/70 shadow-[0_0_0_1px_rgba(89,219,199,0.22),0_0_30px_rgba(89,219,199,0.08)]"
        : "border-outline-variant/80";

  return (
    <article
      className={`group relative overflow-hidden rounded-[28px] border bg-surface-container-lowest shadow-[0_0_0_1px_rgba(134,148,144,0.12)] transition-all ${borderTone} ${className}`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(57,71,102,0.35),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(89,219,199,0.1),transparent_30%),linear-gradient(180deg,rgba(16,20,21,0.65),rgba(11,15,16,0.95))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,10,0.12),rgba(8,10,10,0.48)_56%,rgba(8,10,10,0.88))]" />

      {errorMessage ? (
        <div className="absolute left-4 right-4 top-4 z-20 rounded-2xl border border-error/60 bg-error/12 px-3 py-2 font-label-mono text-[10px] uppercase tracking-[0.05em] text-[#ffd6d2] backdrop-blur-md">
          {errorMessage}
        </div>
      ) : null}

      <div className="relative flex h-full min-h-[240px] flex-col p-5">
        <div className="mb-auto flex items-start justify-between gap-3">
          <div />
          <div
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-label-mono text-[11px] uppercase tracking-[0.05em] ${
              isMatched
                ? "bg-error-container text-[#ffd6d2]"
                : status === "error"
                  ? "bg-error-container text-[#ffd6d2]"
                  : "bg-primary-container text-on-primary-container"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isMatched || status === "error" ? "bg-error animate-pulse" : "bg-primary animate-pulse"
              }`}
            />
            {currentStatus.label}
          </div>
        </div>

        {isMatched && matchSummary ? (
          <div className="pointer-events-none absolute inset-x-[18%] top-1/2 -translate-y-1/2">
            <div className="relative mx-auto rounded-2xl border border-error/80 bg-error/5 px-4 py-5 text-center shadow-[0_0_0_1px_rgba(255,180,171,0.25),0_0_28px_rgba(255,0,0,0.14)]">
              <div className="mx-auto mb-3 inline-flex rounded-full border border-error/60 bg-surface-container-lowest px-2 py-1 font-label-mono text-[11px] uppercase tracking-[0.05em] text-error">
                MATCH FOUND
              </div>
              <div className="text-[17px] font-semibold tracking-[-0.02em] text-white">
                {matchSummary}
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

        {status === "error" ? (
          <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full border border-error/50 bg-error-container/75 px-3 py-1.5 font-label-mono text-[11px] uppercase tracking-[0.05em] text-[#ffd6d2]">
            <span className="h-2 w-2 rounded-full bg-error" />
            Retry Camera
          </div>
        ) : (
          <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full border border-primary/35 bg-surface-container-high/80 px-3 py-1.5 font-label-mono text-[11px] uppercase tracking-[0.05em] text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {cameraReady ? (status === "checking" ? "Checking" : "Streaming") : "Tap to start"}
          </div>
        )}

        {!cameraReady ? (
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <button
              onClick={startCamera}
              type="button"
              className="rounded-full bg-[#59dbc7] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.05em] text-black shadow-[0_0_0_1px_rgba(89,219,199,0.12),0_0_18px_rgba(89,219,199,0.18)]"
            >
              Start Camera
            </button>
          </div>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_50%_100%,rgba(89,219,199,0.12),transparent_50%)]" />

        {isMatched ? (
          <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-transparent transition-colors group-hover:border-primary/20" />
        ) : null}
      </div>
    </article>
  );
}
