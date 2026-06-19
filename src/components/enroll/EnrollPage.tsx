"use client";

import { useState, type FormEvent } from "react";

import OperationalShell from "@/components/shared/OperationalShell";
import CategorySelector, { type EnrollCategory } from "@/components/enroll/CategorySelector";
import BiometricUpload from "@/components/enroll/BiometricUpload";
import WatchlistDetailsForm from "@/components/enroll/WatchlistDetailsForm";
import MedicalProfileForm from "@/components/enroll/MedicalProfileForm";
import EnrollButton from "@/components/enroll/EnrollButton";
import { enrollProfile } from "@/lib/api";

export default function EnrollPage() {
  const [selectedCategory, setSelectedCategory] = useState<EnrollCategory>(null);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [watchlistThreatLevel, setWatchlistThreatLevel] = useState("High");
  const [watchlistReason, setWatchlistReason] = useState("");
  const [watchlistAddedBy, setWatchlistAddedBy] = useState("");
  const [missingLastSeenLocation, setMissingLastSeenLocation] = useState("");
  const [missingDescription, setMissingDescription] = useState("");
  const [missingRegisteredBy, setMissingRegisteredBy] = useState("");
  const [medicalBloodType, setMedicalBloodType] = useState("O+");
  const [medicalEmergencyContact, setMedicalEmergencyContact] = useState("");
  const [medicalAllergies, setMedicalAllergies] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<unknown>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetResultState = () => {
    setSuccessMessage(null);
    setResponseData(null);
    setErrorMessage(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetResultState();

    if (!selectedCategory) {
      setErrorMessage("Select a category before enrolling.");
      return;
    }

    if (!name.trim()) {
      setErrorMessage("Enter a full name before enrolling.");
      return;
    }

    if (!imageFile) {
      setErrorMessage("Choose a profile photo before enrolling.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: Parameters<typeof enrollProfile>[0] = {
        name: name.trim(),
        type: selectedCategory,
        image: imageFile,
      };

      if (selectedCategory === "watchlist") {
        payload.threat_level = watchlistThreatLevel;
        payload.reason = watchlistReason.trim();
        if (watchlistAddedBy.trim()) {
          payload.added_by = watchlistAddedBy.trim();
        }
      }

      if (selectedCategory === "missing") {
        payload.last_seen_location = missingLastSeenLocation.trim();
        payload.description = missingDescription.trim();
        if (missingRegisteredBy.trim()) {
          payload.registered_by = missingRegisteredBy.trim();
        }
      }

      if (selectedCategory === "medical") {
        payload.blood_type = medicalBloodType;
        payload.allergies = medicalAllergies.trim();
        payload.conditions = medicalConditions.trim();
        payload.emergency_contact = medicalEmergencyContact.trim();
      }

      const response = await enrollProfile(payload);
      setSuccessMessage("Enroll request submitted successfully.");
      setResponseData(response);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Unknown enroll error");
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-[640px] rounded-lg border border-outline-variant bg-surface-container p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.015)]"
          >
            <div className="space-y-5">
              <CategorySelector
                selectedCategory={selectedCategory}
                onSelectCategory={(category) => {
                  setSelectedCategory(category);
                  resetResultState();
                }}
              />

              <label className="block space-y-2">
                <span className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                  Full name
                </span>
                <input
                  type="text"
                  placeholder="e.g. Emeka Okafor"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="h-12 w-full rounded-lg border border-outline-variant bg-surface-container-low px-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary"
                />
              </label>

              <BiometricUpload
                fileName={imageFile?.name ?? null}
                onFileChange={(file) => {
                  setImageFile(file);
                  resetResultState();
                }}
              />

              {selectedCategory === "watchlist" ? (
                <WatchlistDetailsForm
                  threatLevel={watchlistThreatLevel}
                  reason={watchlistReason}
                  addedBy={watchlistAddedBy}
                  onThreatLevelChange={setWatchlistThreatLevel}
                  onReasonChange={setWatchlistReason}
                  onAddedByChange={setWatchlistAddedBy}
                />
              ) : null}

              {selectedCategory === "missing" ? (
                <section className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-error">
                      Missing profile details
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                        Last seen location
                      </span>
                      <input
                        type="text"
                        value={missingLastSeenLocation}
                        onChange={(event) => setMissingLastSeenLocation(event.target.value)}
                        placeholder="e.g. Gate B / Lot 4"
                        className="h-12 w-full rounded-lg border border-outline-variant bg-surface-container px-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                        Registered by
                      </span>
                      <input
                        type="text"
                        value={missingRegisteredBy}
                        onChange={(event) => setMissingRegisteredBy(event.target.value)}
                        placeholder="Operator ID or name"
                        className="h-12 w-full rounded-lg border border-outline-variant bg-surface-container px-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary"
                      />
                    </label>
                  </div>

                  <label className="block space-y-2">
                    <span className="font-label-mono text-[11px] uppercase tracking-[0.05em] text-on-surface-variant">
                      Description
                    </span>
                    <textarea
                      value={missingDescription}
                      onChange={(event) => setMissingDescription(event.target.value)}
                      placeholder="Physical description, clothing, notes..."
                      className="min-h-[88px] w-full rounded-lg border border-outline-variant bg-surface-container px-3 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary"
                    />
                  </label>
                </section>
              ) : null}

              {selectedCategory === "medical" ? (
                <MedicalProfileForm
                  bloodType={medicalBloodType}
                  emergencyContact={medicalEmergencyContact}
                  allergies={medicalAllergies}
                  conditions={medicalConditions}
                  onBloodTypeChange={setMedicalBloodType}
                  onEmergencyContactChange={setMedicalEmergencyContact}
                  onAllergiesChange={setMedicalAllergies}
                  onConditionsChange={setMedicalConditions}
                />
              ) : null}

              {successMessage ? (
                <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm text-on-surface">
                  <div className="font-semibold text-primary">{successMessage}</div>
                  <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words rounded-md bg-surface-container-low p-3 font-mono text-[11px] text-on-surface-variant">
                    {JSON.stringify(responseData, null, 2)}
                  </pre>
                </div>
              ) : null}

              {errorMessage ? (
                <div className="rounded-lg border border-error/40 bg-error/10 p-4 text-sm text-error">
                  {errorMessage}
                </div>
              ) : null}

              <EnrollButton
                loading={isSubmitting}
                disabled={!selectedCategory || !name.trim() || !imageFile}
              />
            </div>
          </form>
        </div>
      </main>
    </OperationalShell>
  );
}
