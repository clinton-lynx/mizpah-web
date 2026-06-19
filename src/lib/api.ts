const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://mizpah-be-eg2w.onrender.com";

export async function scanFace(base64Image: string, mode: "passive" | "active") {
  const formData = new URLSearchParams();
  formData.append("image", base64Image);
  formData.append("mode", mode);

  const response = await fetch(`${BASE_URL}/scan`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Scan failed: ${errorText}`);
  }
  return response.json();
}

export async function enrollProfile(data: {
  name: string;
  type: "watchlist" | "missing" | "medical";
  image: File;
  blood_type?: string;
  allergies?: string;
  conditions?: string;
  emergency_contact?: string;
  threat_level?: string;
  reason?: string;
  last_seen_location?: string;
  description?: string;
  registered_by?: string;
  added_by?: string;
}) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("type", data.type);
  formData.append("image", data.image);

  if (data.blood_type) formData.append("blood_type", data.blood_type);
  if (data.allergies) formData.append("allergies", data.allergies);
  if (data.conditions) formData.append("conditions", data.conditions);
  if (data.emergency_contact) formData.append("emergency_contact", data.emergency_contact);
  if (data.threat_level) formData.append("threat_level", data.threat_level);
  if (data.reason) formData.append("reason", data.reason);
  if (data.last_seen_location) formData.append("last_seen_location", data.last_seen_location);
  if (data.description) formData.append("description", data.description);
  if (data.registered_by) formData.append("registered_by", data.registered_by);
  if (data.added_by) formData.append("added_by", data.added_by);

  const response = await fetch(`${BASE_URL}/enroll`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Enroll failed: ${errorText}`);
  }

  return response.json();
}
