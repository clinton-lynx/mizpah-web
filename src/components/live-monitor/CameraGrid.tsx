"use client";

import LiveCameraCard from "@/components/live-monitor/LiveCameraCard";
import CameraCard from "@/components/live-monitor/CameraCard";
import type { LiveAlert } from "@/components/live-monitor/types";

const cameras = [
  {
    name: "Exit B",
    code: "CAM-02",
    status: "live" as const,
    recordLabel: "CAM-02 • LIVE",
  },
  {
    name: "Main Hall",
    code: "CAM-03",
    status: "live" as const,
    recordLabel: "CAM-03 • LIVE",
  },
  {
    name: "Medical Tent",
    code: "CAM-04",
    status: "live" as const,
    recordLabel: "CAM-04 • LIVE",
  },
];

export default function CameraGrid({
  onMatch,
}: {
  onMatch: (alert: LiveAlert) => void;
}) {
  return (
    <section className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2" id="active-feeds">
      <LiveCameraCard
        name="Gate A"
        code="CAM-01"
        recordLabel="CAM-01 • LIVE"
        onMatch={onMatch}
      />
      {cameras.map((camera) => (
        <CameraCard key={camera.code} {...camera} />
      ))}
    </section>
  );
}
