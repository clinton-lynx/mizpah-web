"use client";

import { useState } from "react";

import OperationalShell from "@/components/shared/OperationalShell";
import CategorySelector, { type EnrollCategory } from "@/components/enroll/CategorySelector";
import BiometricUpload from "@/components/enroll/BiometricUpload";
import WatchlistDetailsForm from "@/components/enroll/WatchlistDetailsForm";
import MedicalProfileForm from "@/components/enroll/MedicalProfileForm";
import EnrollButton from "@/components/enroll/EnrollButton";

export default function EnrollPage() {
  const [selectedCategory, setSelectedCategory] = useState<EnrollCategory>(null);

  return (
    <OperationalShell activeNav="enroll">
      <main className="flex min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[920px] flex-col px-2 py-4">
          <div className="mb-6">
            <h1 className="text-[30px] font-bold tracking-[-0.04em] text-on-surface">
              Enroll new profile
            </h1>
            <p className="mt-2 text-sm text-on-surface-variant">
              Add a new individual to the facial recognition database.
            </p>
          </div>

          <form className="mx-auto w-full max-w-[640px] rounded-lg border border-outline-variant bg-surface-container p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.015)]">
            <div className="space-y-5">
              <CategorySelector
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

              <label className="block space-y-2">
                <span className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                  Full name
                </span>
                <input
                  type="text"
                  placeholder="e.g. Emeka Okafor"
                  className="h-12 w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary"
                />
              </label>

              <BiometricUpload />

              {selectedCategory === "watchlist" ? <WatchlistDetailsForm /> : null}
              {selectedCategory === "medical" ? <MedicalProfileForm /> : null}

              <EnrollButton />
            </div>
          </form>
        </div>
      </main>
    </OperationalShell>
  );
}
