// utils/imageAnalysis.js

export const analyzeImage = (img, file) => {
  const errors = [];
  const warnings = [];

  // --- File checks ---
  const MAX_SIZE = 5 * 1024 * 1024;
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (!allowedTypes.includes(file.type)) {
    errors.push("Only JPG and PNG files are allowed");
  }

  if (file.size > MAX_SIZE) {
    errors.push("File size must be less than 5MB");
  }

  // --- Resolution ---
  if (img.naturalWidth < 200 || img.naturalHeight < 200) {
    warnings.push("Low resolution image");
  }

  // --- Canvas analysis ---
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  ctx.drawImage(img, 0, 0);

  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  let brightness = 0;
  let variance = 0;
  const pixels = data.length / 4;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    brightness += avg;
  }
  brightness /= pixels;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    variance += Math.pow(avg - brightness, 2);
  }
  variance /= pixels;

  // --- Brightness ---
  if (brightness < 50) {
    warnings.push("Image is too dark");
  } else if (brightness > 200) {
    warnings.push("Image is too bright");
  }

  // --- Blur ---
  if (variance < 500) {
    warnings.push("Image appears blurry");
  }

  return { errors, warnings };
};