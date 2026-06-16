const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function scanFace(imageBlob: Blob, mode: "passive" | "active") {
  const formData = new FormData();
  formData.append("image", imageBlob, "face.jpg");
  formData.append("mode", mode);

  const response = await fetch(`${BASE_URL}/scan`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Scan failed: ${errorText}`);
  }
  return response.json();
}
