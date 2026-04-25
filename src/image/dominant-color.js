const PALETTE_SWATCHES = [
  { hex: "#000000", token: "black" },
  { hex: "#ffffff", token: "white" },
  { hex: "#7f7f7f", token: "cool-gray" },
  { hex: "#7a5a3a", token: "camel" },
  { hex: "#3f5f3f", token: "forest" },
  { hex: "#2a5f8f", token: "soft-navy" },
  { hex: "#ce6f61", token: "coral" },
  { hex: "#8b2c3e", token: "burgundy" }
];

const imageCache = new Map();

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16)
  };
}

function distance(a, b) {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function nearestToken(rgb) {
  let best = { token: "cool-gray", d: Number.POSITIVE_INFINITY };
  for (const swatch of PALETTE_SWATCHES) {
    const d = distance(rgb, hexToRgb(swatch.hex));
    if (d < best.d) {
      best = { token: swatch.token, d };
    }
  }
  return best.token;
}

export async function detectDominantColorToken(imageUrl) {
  if (!imageUrl) {
    return null;
  }
  if (imageCache.has(imageUrl)) {
    return imageCache.get(imageUrl);
  }

  try {
    const image = await loadImage(imageUrl);
    const canvas = document.createElement("canvas");
    canvas.width = 40;
    canvas.height = 40;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let r = 0;
    let g = 0;
    let b = 0;
    let count = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 120) {
        continue;
      }
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count += 1;
    }
    if (count === 0) {
      return null;
    }
    const token = nearestToken({
      r: Math.round(r / count),
      g: Math.round(g / count),
      b: Math.round(b / count)
    });
    imageCache.set(imageUrl, token);
    return token;
  } catch (_error) {
    return null;
  }
}

function loadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = imageUrl;
  });
}
