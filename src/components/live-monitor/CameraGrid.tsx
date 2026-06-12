import CameraCard from "@/components/live-monitor/CameraCard";

const cameras = [
  {
    name: "Gate A",
    code: "CAM-01",
    status: "match" as const,
    alertLabel: "Match",
    alertDetails: "97% CONF",
    recordLabel: "CAM-01 • REC",
  },
  {
    name: "Gate B",
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

export default function CameraGrid() {
  return (
    <section className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2" id="active-feeds">
      {cameras.map((camera) => (
        <CameraCard key={camera.code} {...camera} />
      ))}
    </section>
  );
}
