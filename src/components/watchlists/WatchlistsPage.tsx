"use client";

import { useEffect, useMemo, useState } from "react";

import OperationalShell from "@/components/shared/OperationalShell";
import MaterialIcon from "@/components/shared/MaterialIcon";
import CaseFilterTabs from "@/components/watchlists/CaseFilterTabs";
import CaseListRow, { type CaseRow } from "@/components/watchlists/CaseListRow";
import CaseSearchBar from "@/components/watchlists/CaseSearchBar";
import { getProfiles } from "@/lib/api";

type CaseFilter = "all" | "watchlist" | "missing" | "medical";

type ProfileRecord = {
  id?: string | number;
  profile_id?: string | number;
  slug?: string;
  name?: string;
  type?: string;
  image?: string;
  image_url?: string;
  photo_url?: string;
  photo?: string;
  blood_type?: string;
  last_seen_location?: string;
  threat_level?: string;
};

type ProfileRow = CaseRow & {
  type: Exclude<CaseFilter, "all">;
};

function getProfileId(profile: ProfileRecord) {
  return String(profile.id ?? profile.profile_id ?? profile.slug ?? profile.name ?? "profile");
}

function getProfileImage(profile: ProfileRecord) {
  return profile.image ?? profile.image_url ?? profile.photo_url ?? profile.photo ?? null;
}

function getProfileType(profile: ProfileRecord): ProfileRow["type"] {
  const type = (profile.type || "").toLowerCase();
  if (type === "missing" || type === "medical" || type === "watchlist") {
    return type;
  }
  return "watchlist";
}

function getMetaLine(profile: ProfileRecord) {
  const type = getProfileType(profile);

  if (type === "medical") {
    return profile.blood_type ? `Blood type ${profile.blood_type}` : "Medical profile";
  }

  if (type === "missing") {
    return profile.last_seen_location ? `Last seen ${profile.last_seen_location}` : "Missing profile";
  }

  if (type === "watchlist") {
    return profile.threat_level ? `Threat level ${profile.threat_level}` : "Watchlist profile";
  }

  return "Profile";
}

export default function WatchlistsPage() {
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<CaseFilter>("all");

  useEffect(() => {
    let cancelled = false;

    async function loadProfiles() {
      setLoading(true);
      setErrorMessage(null);

      try {
        const data = (await getProfiles()) as ProfileRecord[];
        if (cancelled) {
          return;
        }

        setProfiles(
          data.map((profile) => ({
            id: getProfileId(profile),
            name: profile.name || "Unnamed profile",
            imageSrc: getProfileImage(profile),
            category: getProfileType(profile),
            metaLine: getMetaLine(profile),
            type: getProfileType(profile),
          })),
        );
      } catch (err) {
        if (!cancelled) {
          setErrorMessage(err instanceof Error ? err.message : "Failed to fetch profiles");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProfiles();

    return () => {
      cancelled = true;
    };
  }, []);

  const counts = useMemo(() => {
    return {
      all: profiles.length,
      watchlist: profiles.filter((profile) => profile.type === "watchlist").length,
      missing: profiles.filter((profile) => profile.type === "missing").length,
      medical: profiles.filter((profile) => profile.type === "medical").length,
    };
  }, [profiles]);

  const filteredProfiles = useMemo(() => {
    if (activeFilter === "all") {
      return profiles;
    }

    return profiles.filter((profile) => profile.type === activeFilter);
  }, [activeFilter, profiles]);

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="space-y-3 border-b border-outline-variant/60 px-3 py-8 text-sm text-on-surface-variant">
          <div className="h-4 w-28 animate-pulse rounded-full bg-surface-container-high" />
          <div className="h-4 w-64 animate-pulse rounded-full bg-surface-container-high" />
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="rounded-lg border border-error/40 bg-error/10 px-4 py-5 text-sm text-error">
          {errorMessage}
        </div>
      );
    }

    if (!filteredProfiles.length) {
      return (
        <div className="rounded-lg border border-outline-variant/60 bg-surface-container-low px-4 py-5 text-sm text-on-surface-variant">
          No profiles found.
        </div>
      );
    }

    return filteredProfiles.map((row) => <CaseListRow key={row.id} row={row} />);
  }, [errorMessage, filteredProfiles, loading]);

  return (
    <OperationalShell activeNav="watchlists">
      <main className="flex min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col px-2 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-[30px] font-bold tracking-[-0.04em] text-primary">
              Cases
            </h1>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-primary-container px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-container/90"
            >
              <MaterialIcon name="add" className="text-[18px]" />
              New case
            </button>
          </div>

          <div className="mt-5">
            <CaseFilterTabs
              activeFilter={activeFilter}
              counts={counts}
              onSelectFilter={setActiveFilter}
            />
          </div>

          <div className="mt-5">
            <CaseSearchBar />
          </div>

          <div className="mt-6 overflow-hidden">{content}</div>
        </div>
      </main>
    </OperationalShell>
  );
}
