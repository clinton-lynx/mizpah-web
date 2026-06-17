const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
