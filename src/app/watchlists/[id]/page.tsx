"use client";

import { use, useEffect, useMemo, useState } from "react";

import OperationalShell from "@/components/shared/OperationalShell";
import MaterialIcon from "@/components/shared/MaterialIcon";
import { getProfiles } from "@/lib/api";

type ProfileRecord = {
  id?: string | number;
  name?: string;
  type?: "watchlist" | "missing" | "medical" | string;
  image_url?: string | null;
  image?: string | null;
  photo_url?: string | null;
  photo?: string | null;
  created_at?: string | null;
  blood_type?: string | null;
  emergency_contact?: string | null;
  allergies?: string | null;
  conditions?: string | null;
  threat_level?: string | null;
  flagged_by?: string | null;
  reason?: string | null;
  last_seen_location?: string | null;
  description?: string | null;
  guardian_contact?: string | null;
};

type DetailField = {
  label: string;
  value: string;
  icon?: string;
  valueClassName?: string;
};

function getImageSrc(profile: ProfileRecord) {
  return profile.image_url ?? profile.image ?? profile.photo_url ?? profile.photo ?? null;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function formatDate(value?: string | null) {
  if (!value) {
    return "Unknown";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getTypeLabel(type?: string) {
  if (!type) return "Profile";
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function getFields(profile: ProfileRecord): DetailField[] {
  const type = (profile.type || "").toLowerCase();

  if (type === "medical") {
    return [
      { label: "Blood Type", value: profile.blood_type || "Not provided", icon: "water_drop", valueClassName: "text-primary" },
      { label: "Emergency Contact", value: profile.emergency_contact || "Not provided" },
      { label: "Known Allergies", value: profile.allergies || "Not provided", icon: "warning", valueClassName: "text-error" },
      { label: "Existing Conditions", value: profile.conditions || "Not provided" },
    ];
  }

  if (type === "missing") {
    return [
      { label: "Last Seen Location", value: profile.last_seen_location || "Not provided", icon: "location_on", valueClassName: "text-primary" },
      { label: "Description", value: profile.description || "Not provided" },
      { label: "Guardian Contact", value: profile.guardian_contact || "Not provided" },
    ];
  }

  return [
    { label: "Threat Level", value: profile.threat_level || "Not provided", icon: "shield", valueClassName: "text-error" },
    { label: "Flagged By", value: profile.flagged_by || "Not provided" },
    { label: "Reason", value: profile.reason || "Not provided" },
  ];
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      setLoading(true);
      setErrorMessage(null);

      try {
        const profiles = await getProfiles();
        const matchedProfile =
          profiles.find((profile: ProfileRecord) => String(profile.id) === String(id)) || null;

        console.log(
          `[watchlists/[id]] lookup comparison id=${id} type=${typeof id} profiles=${JSON.stringify(profiles)} findResult=${JSON.stringify(matchedProfile)}`,
        );

        if (!cancelled) {
          setProfile(matchedProfile);
        }
      } catch (err) {
        if (!cancelled) {
          setErrorMessage(err instanceof Error ? err.message : "Failed to load profile");
          setProfile(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const fields = useMemo(() => (profile ? getFields(profile) : []), [profile]);

  return (
    <OperationalShell activeNav="watchlists">
      <main className="flex min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-1 py-4">
          <h1 className="text-[30px] font-bold tracking-[-0.04em] text-primary">
            Profile Detail
          </h1>

          {loading ? (
            <div className="rounded-lg border border-outline-variant bg-surface-container p-6">
              <div className="h-6 w-40 animate-pulse rounded-full bg-surface-container-high" />
              <div className="mt-4 h-20 animate-pulse rounded-lg bg-surface-container-high" />
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="h-24 animate-pulse rounded-lg bg-surface-container-high" />
                <div className="h-24 animate-pulse rounded-lg bg-surface-container-high" />
                <div className="h-24 animate-pulse rounded-lg bg-surface-container-high" />
                <div className="h-24 animate-pulse rounded-lg bg-surface-container-high" />
              </div>
            </div>
          ) : errorMessage ? (
            <div className="rounded-lg border border-error/40 bg-error/10 px-4 py-5 text-sm text-error">
              {errorMessage}
            </div>
          ) : !profile ? (
            <div className="rounded-lg border border-outline-variant bg-surface-container px-4 py-5 text-sm text-on-surface-variant">
              Profile not found.
            </div>
          ) : (
            <>
              <section className="rounded-lg border border-outline-variant bg-surface-container p-6">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-5">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary-container text-[28px] font-bold text-white">
                      {getImageSrc(profile) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={getImageSrc(profile) ?? ""}
                          alt={profile.name || "Profile avatar"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>{getInitials(profile.name || "Profile")}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-[30px] font-bold tracking-[-0.04em] text-on-surface">
                        {profile.name || "Unnamed profile"}
                      </h2>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex rounded-full bg-primary-container px-2.5 py-1 font-label-mono text-[11px] font-semibold uppercase tracking-[0.05em] text-on-primary-container">
                          {getTypeLabel(profile.type)}
                        </span>
                      </div>
                      <div className="mt-3 text-sm text-on-surface-variant">
                        Enrolled {formatDate(profile.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-2">
                {fields.map((field) => (
                  <article key={field.label} className="rounded-lg border border-outline-variant bg-surface-container p-4">
                    <div className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                      {field.label}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      {field.icon ? (
                        <MaterialIcon name={field.icon} className="text-[18px] text-on-surface-variant" />
                      ) : null}
                      <div className={`text-[20px] font-bold tracking-[-0.03em] ${field.valueClassName || "text-on-surface"}`}>
                        {field.value}
                      </div>
                    </div>
                  </article>
                ))}
              </section>

              <section className="rounded-lg border border-outline-variant bg-surface-container p-4">
                <div className="flex items-center gap-2">
                  <MaterialIcon name="history" className="text-[18px] text-on-surface-variant" />
                  <h3 className="text-sm font-semibold text-on-surface">Match History</h3>
                </div>
                <div className="mt-4 rounded-lg border border-outline-variant/60 bg-surface-container-low px-4 py-5 text-sm text-on-surface-variant">
                  No match history yet.
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </OperationalShell>
  );
}
