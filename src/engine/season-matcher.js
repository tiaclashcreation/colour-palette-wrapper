import { SEASON_PALETTES } from "./season-palettes.js";
import { extractNormalizedColors, inferWarmth } from "./color-normalizer.js";

const STRONG_THRESHOLD = 72;
const POSSIBLE_THRESHOLD = 48;
const TOKEN_HEX_MAP = {
  coral: "#ff6f61",
  peach: "#ffb07c",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  "warm-green": "#74b72e",
  camel: "#c19a6b",
  ivory: "#f5f0e6",
  cream: "#f7f1dd",
  "warm-beige": "#d8c3a5",
  olive: "#708238",
  moss: "#8a9a5b",
  "dusty-coral": "#c27a6a",
  mustard: "#b08d3e",
  terracotta: "#b86b4b",
  "soft-teal": "#5f8a8b",
  taupe: "#8b7d6b",
  mushroom: "#8c7a6b",
  "warm-gray": "#8d8579",
  forest: "#2f5d3a",
  rust: "#b7410e",
  aubergine: "#4f2e4f",
  "deep-teal": "#1f5c5b",
  chocolate: "#5a3a2e",
  "brick-red": "#8f3b2e",
  "dusty-rose": "#c48793",
  "slate-blue": "#6b7a99",
  lavender: "#b7a5d8",
  "cool-pink": "#d69ab0",
  berry: "#8a5d7b",
  "soft-navy": "#445a7a",
  "cool-gray": "#7b848e",
  "soft-white": "#f2f4f7",
  charcoal: "#36454f",
  "powder-blue": "#b0cfe8",
  mint: "#b9d9c8",
  "light-pink": "#f3c6d3",
  periwinkle: "#b9b9e8",
  "light-lilac": "#d7c7e8",
  "cool-aqua": "#b9e3e5",
  "light-gray": "#d3d7dc",
  "cool-beige": "#d9cec3",
  fuchsia: "#d1007f",
  "electric-blue": "#0066ff",
  emerald: "#00a86b",
  "true-red": "#d80032",
  "icy-pink": "#f4d8ff",
  black: "#0b0b0f",
  white: "#ffffff",
  "icy-gray": "#dce3eb",
  burgundy: "#6e1f3f",
  pine: "#1f4d3a",
  "royal-purple": "#4b2e83",
  "ink-blue": "#1f2f5c",
  cranberry: "#9b1b30",
  "dark-olive": "#4f5b31",
  espresso: "#3b2f2f",
  "warm-navy": "#2c3e5c",
  "clear-navy": "#214a7a",
  "warm-white": "#fff4df",
  lime: "#b7d531",
  "sun-yellow": "#ffd23f",
  "bright-navy": "#1d3f72",
  "bright-coral": "#ff5f6d",
  "clear-turquoise": "#00c2c7",
  "cool-white": "#f8fbff",
  "deep-navy": "#1c2d4f"
};

export function scoreItemForSeason(item, seasonKey) {
  const palette = SEASON_PALETTES[seasonKey];
  if (!palette) {
    return {
      score: 0,
      label: "Not Match",
      matchedColors: [],
      confidence: "low",
      normalizedColors: []
    };
  }

  const normalizedColors = extractNormalizedColors([
    item.title,
    ...(item.colorHints ?? []),
    ...(item.swatches ?? [])
  ]);

  let score = 0;
  const matchedColors = [];
  let warmPenalty = 0;
  const tokenHexes = [];

  for (const color of normalizedColors) {
    if (palette.colors.includes(color)) {
      score += 18;
      matchedColors.push(color);
    }
    if (palette.neutrals.includes(color)) {
      score += 10;
      matchedColors.push(color);
    }
    const tokenHex = TOKEN_HEX_MAP[color];
    if (tokenHex) {
      tokenHexes.push(tokenHex);
    }
    const warmth = inferWarmth(color);
    if ((warmth === "warm") !== palette.warm) {
      warmPenalty += 4;
    }
  }

  if (normalizedColors.length === 0) {
    score = 0;
  }

  const colorSpaceScore = computeColorSpaceScore(tokenHexes, palette);
  const contrastScore = computeContrastScore(tokenHexes, palette);
  const dimensionalScore = computeDimensionalScore(tokenHexes, palette);
  score += colorSpaceScore + contrastScore + dimensionalScore;
  score -= warmPenalty;

  if (matchedColors.length >= 2 && dimensionalScore >= 12) {
    score += 8;
  }

  const safeScore = Math.max(0, Math.min(100, score));
  const label =
    safeScore >= STRONG_THRESHOLD
      ? "Strong Match"
      : safeScore >= POSSIBLE_THRESHOLD
        ? "Possible Match"
        : "Not Match";

  const confidence = normalizedColors.length >= 2 ? "high" : normalizedColors.length === 1 ? "medium" : "low";

  return {
    score: safeScore,
    label,
    matchedColors,
    confidence,
    normalizedColors
  };
}

function computeColorSpaceScore(tokenHexes, palette) {
  if (tokenHexes.length === 0 || !palette.anchors?.length) {
    return 0;
  }

  const anchorLabs = palette.anchors.map((hex) => rgbToLab(hexToRgb(hex)));
  let total = 0;
  for (const hex of tokenHexes) {
    const lab = rgbToLab(hexToRgb(hex));
    let minDelta = Number.POSITIVE_INFINITY;
    for (const anchor of anchorLabs) {
      minDelta = Math.min(minDelta, deltaE76(lab, anchor));
    }
    const closeness = Math.max(0, 1 - minDelta / 60);
    total += closeness * 22;
  }
  return total / tokenHexes.length;
}

function computeContrastScore(tokenHexes, palette) {
  if (tokenHexes.length < 2) {
    return palette.contrast === "low" ? 6 : 3;
  }
  const lValues = tokenHexes.map((hex) => rgbToLab(hexToRgb(hex)).l).sort((a, b) => a - b);
  const range = lValues[lValues.length - 1] - lValues[0];
  if (palette.contrast === "high") {
    return range >= 45 ? 12 : range >= 30 ? 7 : 2;
  }
  if (palette.contrast === "medium") {
    return range >= 25 && range <= 50 ? 10 : 5;
  }
  return range <= 28 ? 12 : range <= 36 ? 8 : 2;
}

function computeDimensionalScore(tokenHexes, palette) {
  if (tokenHexes.length === 0) {
    return 0;
  }
  const labs = tokenHexes.map((hex) => rgbToLab(hexToRgb(hex)));
  const avgL = labs.reduce((sum, lab) => sum + lab.l, 0) / labs.length;
  const avgChroma = labs.reduce((sum, lab) => sum + Math.sqrt(lab.a * lab.a + lab.b * lab.b), 0) / labs.length;

  let score = 0;
  if (palette.value === "light" && avgL >= 70) {
    score += 8;
  } else if (palette.value === "light-medium" && avgL >= 58 && avgL <= 78) {
    score += 8;
  } else if (palette.value === "medium" && avgL >= 45 && avgL <= 68) {
    score += 8;
  } else if (palette.value === "medium-deep" && avgL >= 30 && avgL <= 62) {
    score += 8;
  } else if (palette.value === "deep" && avgL <= 48) {
    score += 8;
  } else {
    score += 2;
  }

  if (palette.chroma === "bright" && avgChroma >= 38) {
    score += 8;
  } else if (palette.chroma === "medium" && avgChroma >= 28 && avgChroma <= 45) {
    score += 8;
  } else if (palette.chroma === "soft" && avgChroma <= 34) {
    score += 8;
  } else {
    score += 2;
  }
  return score;
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16)
  };
}

function rgbToLab(rgb) {
  const xyz = rgbToXyz(rgb);
  return xyzToLab(xyz);
}

function rgbToXyz({ r, g, b }) {
  const normalize = (value) => {
    const channel = value / 255;
    return channel > 0.04045 ? ((channel + 0.055) / 1.055) ** 2.4 : channel / 12.92;
  };
  const rn = normalize(r);
  const gn = normalize(g);
  const bn = normalize(b);
  return {
    x: rn * 0.4124 + gn * 0.3576 + bn * 0.1805,
    y: rn * 0.2126 + gn * 0.7152 + bn * 0.0722,
    z: rn * 0.0193 + gn * 0.1192 + bn * 0.9505
  };
}

function xyzToLab({ x, y, z }) {
  const ref = { x: 0.95047, y: 1, z: 1.08883 };
  const pivot = (value) => (value > 0.008856 ? value ** (1 / 3) : 7.787 * value + 16 / 116);
  const fx = pivot(x / ref.x);
  const fy = pivot(y / ref.y);
  const fz = pivot(z / ref.z);
  return {
    l: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz)
  };
}

function deltaE76(lab1, lab2) {
  const dl = lab1.l - lab2.l;
  const da = lab1.a - lab2.a;
  const db = lab1.b - lab2.b;
  return Math.sqrt(dl * dl + da * da + db * db);
}

export function summarizeResults(results) {
  return results.reduce(
    (acc, item) => {
      acc.scanned += 1;
      if (item.match.label === "Strong Match") {
        acc.strong += 1;
      } else if (item.match.label === "Possible Match") {
        acc.possible += 1;
      } else {
        acc.noMatch += 1;
      }
      return acc;
    },
    { scanned: 0, strong: 0, possible: 0, noMatch: 0 }
  );
}
