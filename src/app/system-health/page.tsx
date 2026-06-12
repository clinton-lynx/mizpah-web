import type { Metadata } from "next";

import SystemHealthPage from "@/components/system-health/SystemHealthPage";

export const metadata: Metadata = {
  title: "Mizpah System Health",
  description: "System health dashboard for Mizpah.",
};

export default function Page() {
  return <SystemHealthPage />;
}
