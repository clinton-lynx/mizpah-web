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

export async function cropFaceFromVideo(
  video: HTMLVideoElement,
  detection: Awaited<ReturnType<typeof detectFace>>,
) {
  if (!detection) {
    return null;
  }

  const { x, y, width, height } = detection.box;
  const padding = Math.max(width, height) * 0.2;

  const sourceLeft = Math.max(0, Math.floor(x - padding));
  const sourceTop = Math.max(0, Math.floor(y - padding));
  const sourceRight = Math.min(video.videoWidth, Math.ceil(x + width + padding));
  const sourceBottom = Math.min(video.videoHeight, Math.ceil(y + height + padding));
  const sourceWidth = Math.max(1, sourceRight - sourceLeft);
  const sourceHeight = Math.max(1, sourceBottom - sourceTop);

  const canvas = document.createElement("canvas");
  canvas.width = sourceWidth;
  canvas.height = sourceHeight;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  context.drawImage(video, sourceLeft, sourceTop, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);

  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.92);
  });
}
