let faceApiModulePromise: Promise<typeof import("face-api.js")> | null = null;
let faceModelLoadPromise: Promise<void> | null = null;

async function getFaceApi() {
  faceApiModulePromise ??= import("face-api.js");
  return faceApiModulePromise;
}

export async function loadFaceDetectionModels() {
  if (!faceModelLoadPromise) {
    faceModelLoadPromise = (async () => {
      const faceapi = await getFaceApi();

      // Keep the model set minimal for a phone kiosk flow.
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    })();
  }

  return faceModelLoadPromise;
}

export async function detectFace(video: HTMLVideoElement) {
  const faceapi = await getFaceApi();

  return faceapi.detectSingleFace(
    video,
    new faceapi.TinyFaceDetectorOptions({
      inputSize: 320,
      scoreThreshold: 0.5,
    }),
  );
}

export function cropFaceFromVideo(
  videoElement: HTMLVideoElement,
  detection: Awaited<ReturnType<typeof detectFace>>,
): string | null {
  if (!detection) {
    return null;
  }

  const { x, y, width, height } = detection.box;
  const canvas = document.createElement("canvas");

  // Resize down to keep the encoded payload comfortably below the API limit.
  const maxWidth = 400;
  const scale = Math.min(1, maxWidth / width);
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  context.drawImage(
    videoElement,
    x,
    y,
    width,
    height,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
  return dataUrl.split(",")[1] || null;
}
