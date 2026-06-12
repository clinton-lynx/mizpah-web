import type { Metadata } from "next";

import AnalyticsPage from "@/components/analytics/AnalyticsPage";

export const metadata: Metadata = {
  title: "Mizpah Analytics",
  description: "Analytics dashboard for Mizpah.",
};

export default function Page() {
  return <AnalyticsPage />;
}
