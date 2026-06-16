"use client";

import { useEffect, useRef, useState } from "react";

import { cropFaceFromVideo, detectFace, loadFaceDetectionModels } from "@/lib/faceDetection";
import { scanFace } from "@/lib/api";

type ScanStatus = "scanning" | "checking" | "matched" | "error";

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

export default function CameraStreamPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanInFlightRef = useRef(false);
  const matchedTimeoutRef = useRef<number | null>(null);
  const statusRef = useRef<ScanStatus>("scanning");
  const [status, setStatus] = useState<ScanStatus>("scanning");
  const [cameraName, setCameraName] = useState("Gate A");
  const [cameraReady, setCameraReady] = useState(false);
  const [modelsReady, setModelsReady] = useState(false);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    let cancelled = false;

    async function startCameraAndModels() {
      try {
        const [streamResult, modelResult] = await Promise.allSettled([
          navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
            audio: false,
          }),
          loadFaceDetectionModels(),
        ]);

        if (cancelled) {
          if (streamResult.status === "fulfilled") {
            streamResult.value.getTracks().forEach((track) => track.stop());
          }
          return;
        }

        if (streamResult.status === "rejected" || modelResult.status === "rejected") {
          if (streamResult.status === "fulfilled") {
            streamResult.value.getTracks().forEach((track) => track.stop());
          }
          setStatus("error");
          return;
        }

        streamRef.current = streamResult.value;
        setModelsReady(true);

        const video = videoRef.current;
        if (video) {
          video.srcObject = streamResult.value;
          await video.play().catch(() => undefined);
        }

        setCameraReady(true);
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    void startCameraAndModels();

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

        const faceBlob = await cropFaceFromVideo(video, detection);
        if (!faceBlob) {
          setStatus("scanning");
          return;
        }

        const response = await scanFace(faceBlob, "passive");

        if (cancelled) {
          return;
        }

        if (response.matched ?? response.matchFound) {
          setStatus("matched");

          if (matchedTimeoutRef.current) {
            window.clearTimeout(matchedTimeoutRef.current);
          }

          matchedTimeoutRef.current = window.setTimeout(() => {
            if (!cancelled) {
              setStatus("scanning");
            }
          }, 1500);
          return;
        }

        setStatus("scanning");
      } catch {
        if (!cancelled) {
          setStatus("scanning");
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
  }, [cameraReady, cameraName, modelsReady]);

  useEffect(() => {
    return () => {
      if (matchedTimeoutRef.current) {
        window.clearTimeout(matchedTimeoutRef.current);
      }
    };
  }, []);

  const currentStatus = statusConfig[status];
  const cameraLabel = cameraName.trim() || "Unnamed camera";

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#050b0c] text-on-surface">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(89,219,199,0.12),transparent_35%),linear-gradient(to_bottom,rgba(5,11,12,0.08),rgba(5,11,12,0.58))]" />

      <div className="absolute left-0 right-0 top-0 z-20 flex flex-col gap-3 p-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <label className="w-full max-w-[18rem]">
          <span className="mb-2 block font-label-mono text-[10px] uppercase tracking-[0.08em] text-on-surface-variant">
            Camera name
          </span>
          <input
            value={cameraName}
            onChange={(event) => setCameraName(event.target.value)}
            placeholder="Gate A"
            className="h-11 w-full rounded-sm border border-outline-variant/80 bg-surface-container-low/90 px-3 text-[14px] text-on-surface placeholder:text-on-surface-variant/70 backdrop-blur-md outline-none"
            type="text"
          />
        </label>

        <div className={`inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md ${currentStatus.tone}`}>
          <span className={`h-2.5 w-2.5 rounded-full ${currentStatus.dot}`} />
          <span className="font-label-mono text-[11px] uppercase tracking-[0.08em]">
            {cameraLabel} - {currentStatus.label}
          </span>
        </div>
      </div>

      {!cameraReady && status !== "error" ? (
        <div className="absolute inset-0 z-10 flex items-end p-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <div className="max-w-[18rem] rounded-full border border-white/10 bg-black/35 px-3 py-2 font-label-mono text-[11px] uppercase tracking-[0.08em] text-on-surface-variant backdrop-blur-md">
            Initializing camera...
          </div>
        </div>
      ) : null}
    </main>
  );
}
