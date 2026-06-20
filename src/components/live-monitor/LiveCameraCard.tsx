"use client";

import { useEffect, useRef, useState } from "react";

import { cropFaceFromVideo, detectFace, loadFaceDetectionModels } from "@/lib/faceDetection";
import { scanFace } from "@/lib/api";
import type {
  LiveAlertReport,
  LiveMatchPayload,
  LiveAlertType,
} from "@/components/live-monitor/types";

type ScanStatus = "scanning" | "checking" | "matched" | "error";

type ScanResponse = {
  matched?: boolean;
  matchFound?: boolean;
  confidence?: number | string;
  profile?: {
    name?: string;
    type?: LiveAlertType | string;
  } | null;
  name?: string;
  type?: LiveAlertType | string;
  reports?: LiveAlertReport[];
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

function getCropDimensions(
  detection: NonNullable<Awaited<ReturnType<typeof detectFace>>>,
) {
  const maxWidth = 400;
  const scale = Math.min(1, maxWidth / detection.box.width);

  return {
    width: Math.max(1, Math.round(detection.box.width * scale)),
    height: Math.max(1, Math.round(detection.box.height * scale)),
  };
}

export interface LiveCameraCardProps {
  name: string;
  code: string;
  recordLabel?: string;
  className?: string;
  onMatch?: (match: LiveMatchPayload) => void;
}

export default function LiveCameraCard({
  name,
  code,
  recordLabel = `${code} • LIVE`,
  className = "",
  onMatch,
}: LiveCameraCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanInFlightRef = useRef(false);
  const matchedTimeoutRef = useRef<number | null>(null);
  const statusRef = useRef<ScanStatus>("scanning");
  const [status, setStatus] = useState<ScanStatus>("scanning");
  const [cameraReady, setCameraReady] = useState(false);
  const [modelsReady, setModelsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [matchSummary, setMatchSummary] = useState<string | null>(null);
  const [cropPreviewSrc, setCropPreviewSrc] = useState<string | null>(null);

  function createAlertId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function normalizeAlertType(value: unknown): LiveAlertType {
    if (value === "medical" || value === "missing" || value === "watchlist") {
      return value;
    }

    return "watchlist";
  }

  function clearFaceOverlay() {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawFaceOverlay(video: HTMLVideoElement, detection: Awaited<ReturnType<typeof detectFace>>) {
    const canvas = canvasRef.current;
    if (!canvas || !detection) {
      clearFaceOverlay();
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const displayWidth = video.clientWidth || video.videoWidth;
    const displayHeight = video.clientHeight || video.videoHeight;
    if (!displayWidth || !displayHeight || !video.videoWidth || !video.videoHeight) {
      clearFaceOverlay();
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(displayWidth * dpr);
    canvas.height = Math.round(displayHeight * dpr);
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, displayWidth, displayHeight);

    const scaleX = displayWidth / video.videoWidth;
    const scaleY = displayHeight / video.videoHeight;
    const { x, y, width, height } = detection.box;
    const strokeWidth = 3;
    const inset = strokeWidth / 2;

    context.strokeStyle = "#59dbc7";
    context.lineWidth = strokeWidth;
    context.strokeRect(
      x * scaleX + inset,
      y * scaleY + inset,
      width * scaleX - strokeWidth,
      height * scaleY - strokeWidth,
    );
  }

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
        drawFaceOverlay(video, detection);

        if (cancelled) {
          return;
        }

        if (!detection) {
          setCropPreviewSrc(null);
          clearFaceOverlay();
          setStatus("scanning");
          return;
        }

        const base64Face = cropFaceFromVideo(video, detection);
        if (!base64Face) {
          setCropPreviewSrc(null);
          setStatus("scanning");
          return;
        }

        const { width: cropWidth, height: cropHeight } = getCropDimensions(detection);
        console.log(
          `[LiveCameraCard] crop size for ${name}: ${cropWidth}x${cropHeight}`,
        );
        setCropPreviewSrc(`data:image/jpeg;base64,${base64Face}`);

        const response = (await scanFace(base64Face, "passive")) as ScanResponse;

        if (cancelled) {
          return;
        }

        if (response.matched ?? response.matchFound) {
          onMatch?.({
            profileName: response.profile?.name ?? response.name ?? name,
            profileType: normalizeAlertType(response.profile?.type ?? response.type),
            reports: response.reports ?? [],
            location: name,
            confidence: response.confidence ?? null,
            timestamp: new Date().toISOString(),
          });
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
        setCropPreviewSrc(null);
        clearFaceOverlay();
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

      clearFaceOverlay();

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
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />

      {cropPreviewSrc ? (
        <div className="absolute bottom-4 left-4 z-20 overflow-hidden rounded-2xl border border-outline-variant/70 bg-surface-container-lowest/85 shadow-[0_0_0_1px_rgba(0,0,0,0.18)]">
          <div className="border-b border-outline-variant/60 px-2 py-1 font-label-mono text-[10px] uppercase tracking-[0.05em] text-on-surface-variant">
            Capture preview
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cropPreviewSrc}
            alt={`${name} crop preview`}
            className="h-24 w-24 object-cover"
          />
        </div>
      ) : null}

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
