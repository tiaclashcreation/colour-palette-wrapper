const DEFAULT_SEASON = "warmSpring";

const SEASON_PALETTES = {
  warmSpring: {
    warm: true,
    colors: ["coral", "peach", "tomato", "turquoise", "warm-green", "sun-yellow", "camel", "ivory"],
    neutrals: ["cream", "warm-beige", "camel"]
  },
  clearSpring: {
    warm: true,
    colors: ["bright-coral", "coral", "clear-turquoise", "turquoise", "lime", "sun-yellow", "bright-navy", "ivory"],
    neutrals: ["clear-navy", "warm-white", "camel"]
  },
  lightSpring: {
    warm: true,
    colors: ["apricot", "peach", "light-coral", "mint", "light-turquoise", "butter-yellow", "powder-blue", "light-pink"],
    neutrals: ["cream", "warm-white", "light-camel"]
  },
  trueSummer: {
    warm: false,
    colors: ["rose", "dusty-rose", "mauve", "lavender", "cornflower", "soft-navy", "raspberry", "cool-pink"],
    neutrals: ["soft-white", "cool-gray", "soft-navy"]
  },
  softAutumn: {
    warm: true,
    colors: ["olive", "moss", "dusty-coral", "mustard", "terracotta", "rust", "soft-teal", "teal", "taupe"],
    neutrals: ["taupe", "mushroom", "warm-gray", "cream"]
  },
  deepAutumn: {
    warm: true,
    colors: ["forest", "rust", "aubergine", "deep-teal", "teal", "chocolate", "mustard", "brick-red", "pumpkin"],
    neutrals: ["dark-olive", "espresso", "camel", "warm-navy"]
  },
  trueAutumn: {
    warm: true,
    colors: ["rust", "pumpkin", "olive", "forest", "teal", "deep-teal", "mustard", "brick-red", "terracotta"],
    neutrals: ["camel", "warm-beige", "chocolate", "espresso"]
  },
  coolSummer: {
    warm: false,
    colors: ["dusty-rose", "rose", "mauve", "slate-blue", "lavender", "cool-pink", "berry", "soft-navy", "cornflower"],
    neutrals: ["cool-gray", "soft-white", "charcoal"]
  },
  lightSummer: {
    warm: false,
    colors: ["powder-blue", "mint", "light-pink", "periwinkle", "light-lilac", "cool-aqua", "cornflower"],
    neutrals: ["soft-white", "light-gray", "cool-beige"]
  },
  brightWinter: {
    warm: false,
    colors: ["fuchsia", "magenta", "electric-blue", "cobalt", "emerald", "true-red", "icy-pink", "royal-purple", "black", "white"],
    neutrals: ["black", "white", "icy-gray"]
  },
  trueWinter: {
    warm: false,
    colors: ["true-red", "cobalt", "electric-blue", "emerald", "magenta", "fuchsia", "royal-purple", "icy-pink", "white"],
    neutrals: ["black", "white", "cool-gray", "charcoal"]
  },
  deepWinter: {
    warm: false,
    colors: ["burgundy", "pine", "royal-purple", "ink-blue", "cranberry", "true-red", "black", "white"],
    neutrals: ["black", "charcoal", "cool-white", "deep-navy"]
  }
};

const SEASON_PROFILES = {
  warmSpring: { chroma: "bright", value: "light-medium", contrast: "medium", anchors: ["#ff6f61", "#ffb07c", "#27c2b8", "#74b72e", "#f5e6cc", "#c19a6b"] },
  clearSpring: { chroma: "bright", value: "medium", contrast: "high", anchors: ["#ff5f6d", "#00c2c7", "#d0e63a", "#ffd23f", "#1d3f72", "#f7f1dd"] },
  lightSpring: { chroma: "soft", value: "light", contrast: "low", anchors: ["#ffd1a9", "#ffcf9c", "#f6b3a6", "#c8e3c2", "#a9dfdd", "#f9e7a3", "#f9f0dd"] },
  trueSummer: { chroma: "soft", value: "light-medium", contrast: "low", anchors: ["#d4a6b1", "#b58aa0", "#b7a5d8", "#8aa4d6", "#445a7a", "#9f5f80", "#eef1f7"] },
  softAutumn: { chroma: "soft", value: "medium", contrast: "low", anchors: ["#7a8450", "#8a9a5b", "#c27a6a", "#b08d3e", "#b86b4b", "#7b8f87", "#8c7a6b"] },
  deepAutumn: { chroma: "medium", value: "deep", contrast: "medium", anchors: ["#2f5d3a", "#b7410e", "#4f2e4f", "#1f5c5b", "#5a3a2e", "#a67c2d", "#8f3b2e"] },
  trueAutumn: { chroma: "medium", value: "medium-deep", contrast: "medium", anchors: ["#b35a2e", "#cc7722", "#708238", "#3e5f3a", "#2f6f6d", "#b08d3e", "#8f3b2e"] },
  coolSummer: { chroma: "soft", value: "light-medium", contrast: "low", anchors: ["#c48793", "#6b7a99", "#b7a5d8", "#d69ab0", "#8a5d7b", "#6c7480", "#f2f4f7"] },
  lightSummer: { chroma: "soft", value: "light", contrast: "low", anchors: ["#b0cfe8", "#b9d9c8", "#f3c6d3", "#b9b9e8", "#d7c7e8", "#b9e3e5", "#eff2f5"] },
  brightWinter: { chroma: "bright", value: "medium-deep", contrast: "high", anchors: ["#d1007f", "#0066ff", "#00a86b", "#d80032", "#f4d8ff", "#0b0b0f", "#ffffff"] },
  trueWinter: { chroma: "bright", value: "deep", contrast: "high", anchors: ["#d80032", "#0047ab", "#008a5b", "#c2185b", "#4b2e83", "#f3dfff", "#ffffff"] },
  deepWinter: { chroma: "bright", value: "deep", contrast: "high", anchors: ["#6e1f3f", "#1f4d3a", "#4b2e83", "#1f2f5c", "#9b1b30", "#0b0b0f", "#f8fbff"] }
};

const TOKEN_HEX_MAP = {
  coral: "#ff6f61", peach: "#ffb07c", tomato: "#ff6347", turquoise: "#40e0d0", "warm-green": "#74b72e",
  camel: "#c19a6b", ivory: "#f5f0e6", cream: "#f7f1dd", "warm-beige": "#d8c3a5", olive: "#708238",
  moss: "#8a9a5b", "dusty-coral": "#c27a6a", mustard: "#b08d3e", terracotta: "#b86b4b", "soft-teal": "#5f8a8b",
  taupe: "#8b7d6b", mushroom: "#8c7a6b", "warm-gray": "#8d8579", forest: "#2f5d3a", rust: "#b7410e",
  aubergine: "#4f2e4f", "deep-teal": "#1f5c5b", chocolate: "#5a3a2e", "brick-red": "#8f3b2e",
  "dusty-rose": "#c48793", "slate-blue": "#6b7a99", lavender: "#b7a5d8", "cool-pink": "#d69ab0", berry: "#8a5d7b",
  "soft-navy": "#445a7a", "cool-gray": "#7b848e", "soft-white": "#f2f4f7", charcoal: "#36454f", "powder-blue": "#b0cfe8",
  mint: "#b9d9c8", "light-pink": "#f3c6d3", periwinkle: "#b9b9e8", "light-lilac": "#d7c7e8", "cool-aqua": "#b9e3e5",
  "light-gray": "#d3d7dc", "cool-beige": "#d9cec3", fuchsia: "#d1007f", "electric-blue": "#0066ff",
  emerald: "#00a86b", "true-red": "#d80032", "icy-pink": "#f4d8ff", black: "#0b0b0f", white: "#ffffff",
  "icy-gray": "#dce3eb", burgundy: "#6e1f3f", pine: "#1f4d3a", "royal-purple": "#4b2e83", "ink-blue": "#1f2f5c",
  cranberry: "#9b1b30", "dark-olive": "#4f5b31", espresso: "#3b2f2f", "warm-navy": "#2c3e5c",
  "clear-navy": "#214a7a", "warm-white": "#fff4df", lime: "#b7d531", "sun-yellow": "#ffd23f",
  "bright-navy": "#1d3f72", "bright-coral": "#ff5f6d", "clear-turquoise": "#00c2c7", "cool-white": "#f8fbff",
  "deep-navy": "#1c2d4f",
  apricot: "#ffd1a9", "light-coral": "#f6b3a6", "light-turquoise": "#a9dfdd", "butter-yellow": "#f9e7a3",
  "light-camel": "#d8b38a", mauve: "#b58aa0", cornflower: "#8aa4d6", raspberry: "#9f5f80",
  pumpkin: "#cc7722", teal: "#2f6f6d", cobalt: "#0047ab", magenta: "#c2185b"
};

const COLOR_SYNONYMS = {
  ivory: "cream",
  ecru: "cream",
  offwhite: "soft-white",
  "off-white": "soft-white",
  stone: "warm-beige",
  beige: "warm-beige",
  camel: "camel",
  tan: "camel",
  khaki: "olive",
  olive: "olive",
  moss: "moss",
  sage: "moss",
  forest: "forest",
  emerald: "emerald",
  green: "warm-green",
  teal: "soft-teal",
  turquoise: "turquoise",
  lightturquoise: "light-turquoise",
  aqua: "cool-aqua",
  blue: "soft-navy",
  cornflower: "cornflower",
  navy: "soft-navy",
  cobalt: "electric-blue",
  royalblue: "electric-blue",
  purple: "royal-purple",
  magenta: "magenta",
  lilac: "light-lilac",
  lavender: "lavender",
  mauve: "mauve",
  pink: "cool-pink",
  raspberry: "raspberry",
  rose: "dusty-rose",
  fuchsia: "fuchsia",
  coral: "coral",
  lightcoral: "light-coral",
  apricot: "apricot",
  peach: "peach",
  salmon: "light-coral",
  orange: "terracotta",
  pumpkin: "pumpkin",
  rust: "rust",
  red: "true-red",
  burgundy: "burgundy",
  wine: "burgundy",
  maroon: "burgundy",
  mustard: "mustard",
  yellow: "sun-yellow",
  brown: "chocolate",
  chocolate: "chocolate",
  taupe: "taupe",
  mushroom: "mushroom",
  grey: "cool-gray",
  gray: "cool-gray",
  charcoal: "charcoal",
  black: "black",
  white: "white",
  cream: "cream"
};

const COLOR_TOKEN_SPLIT = /[\s,./|+&()-]+/;

const SELECTORS = {
  cards: [
    '[data-auto-id="productTile"]',
    '[data-testid="productTile"]',
    '[data-testid*="product-card"]',
    'article:has(a[href*="/prd/"])',
    'article:has(a[href*="/product/"])'
  ],
  title: [
    '[data-auto-id="productTileDescription"]',
    '[data-testid="productDescription"]',
    'h2',
    'h3'
  ],
  link: ['a[href*="/prd/"]', 'a[href*="/product/"]', "a"],
  image: ["img"],
  swatchText: ['[data-auto-id="productTileColour"]', '[data-testid="colourway"]']
};

const PALETTE_SWATCHES = [
  { hex: "#000000", token: "black" },
  { hex: "#ffffff", token: "white" },
  { hex: "#7f7f7f", token: "cool-gray" },
  { hex: "#d8c3a5", token: "warm-beige" },
  { hex: "#c19a6b", token: "camel" },
  { hex: "#8b7d6b", token: "taupe" },
  { hex: "#5a3a2e", token: "chocolate" },
  { hex: "#2f5d3a", token: "forest" },
  { hex: "#708238", token: "olive" },
  { hex: "#8a9a5b", token: "moss" },
  { hex: "#5f8a8b", token: "soft-teal" },
  { hex: "#2f6f6d", token: "teal" },
  { hex: "#445a7a", token: "soft-navy" },
  { hex: "#8aa4d6", token: "cornflower" },
  { hex: "#0066ff", token: "electric-blue" },
  { hex: "#ff6f61", token: "coral" },
  { hex: "#ffb07c", token: "peach" },
  { hex: "#f6b3a6", token: "light-coral" },
  { hex: "#b86b4b", token: "terracotta" },
  { hex: "#b7410e", token: "rust" },
  { hex: "#cc7722", token: "pumpkin" },
  { hex: "#ffd23f", token: "sun-yellow" },
  { hex: "#b08d3e", token: "mustard" },
  { hex: "#b7d531", token: "lime" },
  { hex: "#00a86b", token: "emerald" },
  { hex: "#d69ab0", token: "cool-pink" },
  { hex: "#c48793", token: "dusty-rose" },
  { hex: "#d1007f", token: "fuchsia" },
  { hex: "#c2185b", token: "magenta" },
  { hex: "#6e1f3f", token: "burgundy" },
  { hex: "#9b1b30", token: "cranberry" },
  { hex: "#4b2e83", token: "royal-purple" }
];

const imageCache = new Map();

function cardIdFromLink(linkHref) {
  if (!linkHref) {
    return null;
  }
  const trimmed = linkHref.split("?")[0];
  return trimmed.toLowerCase();
}

function normalizeToken(token) {
  const compact = token.toLowerCase().trim().replace(/[^a-z-]/g, "");
  return COLOR_SYNONYMS[compact] ?? COLOR_SYNONYMS[compact.replace("-", "")] ?? null;
}

function extractNormalizedColors(inputs) {
  const output = new Set();
  for (const input of inputs.filter(Boolean)) {
    const tokens = input.split(COLOR_TOKEN_SPLIT);
    for (const token of tokens) {
      const mapped = normalizeToken(token);
      if (mapped) {
        output.add(mapped);
      }
    }
  }
  return [...output];
}

function inferWarmth(colorToken) {
  const coolTokens = new Set([
    "cool-pink",
    "dusty-rose",
    "lavender",
    "electric-blue",
    "royal-purple",
    "fuchsia",
    "cool-gray",
    "charcoal",
    "cool-aqua",
    "cornflower",
    "mauve",
    "raspberry",
    "magenta"
  ]);
  return coolTokens.has(colorToken) ? "cool" : "warm";
}

function scoreItemForSeason(item, seasonKey) {
  const palette = SEASON_PALETTES[seasonKey];
  const profile = SEASON_PROFILES[seasonKey];
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
      warmPenalty += 2;
    }
  }

  if (normalizedColors.length === 0) {
    score = 0;
  }

  score += computeColorSpaceScore(tokenHexes, profile);
  score += computeContrastScore(tokenHexes, profile);
  score += computeDimensionalScore(tokenHexes, profile);
  score -= warmPenalty;

  const colorSpaceOnly = computeColorSpaceScore(tokenHexes, profile);
  if (matchedColors.length === 0 && colorSpaceOnly >= 14) {
    // Rescue near-palette colors when metadata labels are vague.
    score = Math.max(score, 50);
  }

  if (matchedColors.length >= 2 && computeDimensionalScore(tokenHexes, profile) >= 12) {
    score += 8;
  }

  const safeScore = Math.max(0, Math.min(100, score));
  const label = safeScore >= 48 ? "Match" : "Not Match";
  const confidence = normalizedColors.length >= 2 ? "high" : normalizedColors.length === 1 ? "medium" : "low";

  return {
    score: safeScore,
    label,
    matchedColors,
    confidence,
    normalizedColors
  };
}

function computeColorSpaceScore(tokenHexes, profile) {
  if (!profile?.anchors?.length || tokenHexes.length === 0) {
    return 0;
  }
  const anchorLabs = profile.anchors.map((hex) => rgbToLab(hexToRgb(hex)));
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

function computeContrastScore(tokenHexes, profile) {
  if (!profile || tokenHexes.length < 2) {
    return profile?.contrast === "low" ? 6 : 3;
  }
  const lValues = tokenHexes.map((hex) => rgbToLab(hexToRgb(hex)).l).sort((a, b) => a - b);
  const range = lValues[lValues.length - 1] - lValues[0];
  if (profile.contrast === "high") {
    return range >= 45 ? 12 : range >= 30 ? 7 : 2;
  }
  if (profile.contrast === "medium") {
    return range >= 25 && range <= 50 ? 10 : 5;
  }
  return range <= 28 ? 12 : range <= 36 ? 8 : 2;
}

function computeDimensionalScore(tokenHexes, profile) {
  if (!profile || tokenHexes.length === 0) {
    return 0;
  }
  const labs = tokenHexes.map((hex) => rgbToLab(hexToRgb(hex)));
  const avgL = labs.reduce((sum, lab) => sum + lab.l, 0) / labs.length;
  const avgChroma = labs.reduce((sum, lab) => sum + Math.sqrt(lab.a * lab.a + lab.b * lab.b), 0) / labs.length;

  let score = 0;
  if (profile.value === "light" && avgL >= 70) {
    score += 8;
  } else if (profile.value === "light-medium" && avgL >= 58 && avgL <= 78) {
    score += 8;
  } else if (profile.value === "medium" && avgL >= 45 && avgL <= 68) {
    score += 8;
  } else if (profile.value === "medium-deep" && avgL >= 30 && avgL <= 62) {
    score += 8;
  } else if (profile.value === "deep" && avgL <= 48) {
    score += 8;
  } else {
    score += 2;
  }

  if (profile.chroma === "bright" && avgChroma >= 38) {
    score += 8;
  } else if (profile.chroma === "medium" && avgChroma >= 28 && avgChroma <= 45) {
    score += 8;
  } else if (profile.chroma === "soft" && avgChroma <= 34) {
    score += 8;
  } else {
    score += 2;
  }
  return score;
}

function summarizeResults(results) {
  return results.reduce(
    (acc, item) => {
      acc.scanned += 1;
      if (item.match.label === "Match") {
        acc.match += 1;
      } else {
        acc.noMatch += 1;
      }
      return acc;
    },
    { scanned: 0, match: 0, noMatch: 0 }
  );
}

function getProductCards(documentRef = document) {
  const all = [];
  for (const selector of SELECTORS.cards) {
    try {
      all.push(...documentRef.querySelectorAll(selector));
    } catch (_error) {
      // Ignore invalid selector support on older selector engines.
    }
  }

  if (all.length === 0) {
    const productLinks = [
      ...documentRef.querySelectorAll('a[href*="/prd/"], a[href*="/product/"]')
    ];
    for (const link of productLinks) {
      const cardLike = link.closest(
        '[data-auto-id="productTile"], [data-testid="productTile"], [data-testid*="product-card"], li, article, div'
      );
      if (cardLike) {
        all.push(cardLike);
      }
    }
  }

  const unique = [...new Set(all)];
  return unique.filter((node) => node.querySelector('a[href*="/prd/"], a[href*="/product/"]'));
}

function queryFirst(node, selectors) {
  for (const selector of selectors) {
    const found = node.querySelector(selector);
    if (found) {
      return found;
    }
  }
  return null;
}

function extractProductData(cardNode) {
  const titleNode = queryFirst(cardNode, SELECTORS.title);
  const linkNode = queryFirst(cardNode, SELECTORS.link);
  const imageNode = queryFirst(cardNode, SELECTORS.image);
  const swatchNode = queryFirst(cardNode, SELECTORS.swatchText);

  const linkText = linkNode?.textContent?.trim() ?? "";
  const linkAria = linkNode?.getAttribute("aria-label")?.trim() ?? "";
  const dataName = cardNode.getAttribute("data-product-name")?.trim() ?? "";
  const imageAlt = imageNode?.alt?.trim() ?? "";
  const title = titleNode?.textContent?.trim() || linkAria || dataName || imageAlt || linkText;
  const url = linkNode?.href ?? "";
  const id = cardIdFromLink(url) ?? title;
  const swatchText = swatchNode?.textContent?.trim() ?? "";
  const colorFromData =
    cardNode.getAttribute("data-colour")?.trim() ??
    cardNode.getAttribute("data-color")?.trim() ??
    "";

  if (!id || !title || !url) {
    return null;
  }

  return {
    id,
    title,
    url,
    imageUrl: imageNode?.currentSrc || imageNode?.src || "",
    colorHints: [swatchText, colorFromData].filter(Boolean),
    swatches: [swatchText].filter(Boolean),
    cardNode
  };
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

function loadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = imageUrl;
  });
}

function rgbToHsv({ r, g, b }) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rn) {
      h = ((gn - bn) / d) % 6;
    } else if (max === gn) {
      h = (bn - rn) / d + 2;
    } else {
      h = (rn - gn) / d + 4;
    }
    h *= 60;
    if (h < 0) {
      h += 360;
    }
  }
  const s = max === 0 ? 0 : d / max;
  const v = max;
  return { h, s, v };
}

function foregroundLikely(rgb) {
  const hsv = rgbToHsv(rgb);
  // Ignore near-white/gray backgrounds and very dark noise.
  if (hsv.v > 0.9 && hsv.s < 0.18) {
    return false;
  }
  if (hsv.v < 0.12) {
    return false;
  }
  if (hsv.s < 0.08) {
    return false;
  }
  return true;
}

async function detectDominantColorTokens(imageUrl) {
  if (!imageUrl) {
    return [];
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

    const bins = new Map();
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 120) {
        continue;
      }
      const rgb = { r: data[i], g: data[i + 1], b: data[i + 2] };
      if (!foregroundLikely(rgb)) {
        continue;
      }
      const key = `${Math.round(rgb.r / 24)}-${Math.round(rgb.g / 24)}-${Math.round(rgb.b / 24)}`;
      const entry = bins.get(key) ?? { r: 0, g: 0, b: 0, count: 0 };
      entry.r += rgb.r;
      entry.g += rgb.g;
      entry.b += rgb.b;
      entry.count += 1;
      bins.set(key, entry);
    }
    if (bins.size === 0) {
      return [];
    }
    const topBins = [...bins.values()].sort((a, b) => b.count - a.count).slice(0, 3);
    const tokens = [];
    for (const bin of topBins) {
      const token = nearestToken({
        r: Math.round(bin.r / bin.count),
        g: Math.round(bin.g / bin.count),
        b: Math.round(bin.b / bin.count)
      });
      if (!tokens.includes(token)) {
        tokens.push(token);
      }
    }
    imageCache.set(imageUrl, tokens);
    return tokens;
  } catch (_error) {
    return [];
  }
}

let currentState = {
  season: DEFAULT_SEASON,
  filterMode: "match",
  sessionFilterMode: "match",
  isActive: false,
  isBatchLoading: false,
  batchTarget: 100,
  stats: { scanned: 0, match: 0, noMatch: 0, parsed: 0, unparsed: 0, untracked: 0, unparsedReasons: {} }
};
let observer;
let interactionHooksBound = false;

function canRun() {
  return window.location.hostname.includes("asos.com");
}

function ensureBadge(cardNode, label, confidence) {
  let badge = cardNode.querySelector(".csh-badge");
  if (!badge) {
    badge = document.createElement("span");
    badge.className = "csh-badge";
    cardNode.appendChild(badge);
  }
  badge.dataset.label = label;
  badge.title = `Confidence: ${confidence}`;
  badge.textContent = label;
}

function clearCardDecorations(cardNode) {
  cardNode.removeAttribute("data-csh-status");
  cardNode.removeAttribute("data-csh-hidden");
  cardNode.removeAttribute("data-csh-unparsed");
  cardNode.removeAttribute("data-csh-untracked");
  const badge = cardNode.querySelector(".csh-badge");
  if (badge) {
    badge.remove();
  }
}

function shouldHideByFilterMode(label) {
  if (
    currentState.filterMode === "match" ||
    currentState.filterMode === "strong" ||
    currentState.filterMode === "possible" ||
    currentState.filterMode === "both"
  ) {
    return label === "Not Match";
  }
  if (currentState.filterMode === "all") {
    return false;
  }
  return false;
}

function explainParseFailure(cardNode) {
  const linkNode = queryFirst(cardNode, SELECTORS.link);
  if (!linkNode?.href) {
    return "missing-link";
  }
  const titleNode = queryFirst(cardNode, SELECTORS.title);
  const imageNode = queryFirst(cardNode, SELECTORS.image);
  const linkText = linkNode?.textContent?.trim() ?? "";
  const linkAria = linkNode?.getAttribute("aria-label")?.trim() ?? "";
  const dataName = cardNode.getAttribute("data-product-name")?.trim() ?? "";
  const imageAlt = imageNode?.alt?.trim() ?? "";
  const title = titleNode?.textContent?.trim() || linkAria || dataName || imageAlt || linkText;
  if (!title) {
    return "missing-title";
  }
  const id = cardIdFromLink(linkNode.href) ?? title;
  if (!id) {
    return "missing-id";
  }
  return "unknown-parse-failure";
}

function markUnparsed(cardNode, reason) {
  clearCardDecorations(cardNode);
  cardNode.dataset.cshUnparsed = "true";
  ensureBadge(cardNode, "Unparsed", reason);
}

function markUntracked(cardNode) {
  clearCardDecorations(cardNode);
  cardNode.dataset.cshUntracked = "true";
  ensureBadge(cardNode, "Untracked", "product-like tile not captured by parser selectors");
}

function getProductLikeCandidates(documentRef = document) {
  const roots = [];
  const anchors = [...documentRef.querySelectorAll("a[href]")];
  for (const anchor of anchors) {
    const href = anchor.getAttribute("href") ?? "";
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) {
      continue;
    }
    if (!anchor.querySelector("img")) {
      continue;
    }
    const root = anchor.closest(
      '[data-auto-id="productTile"], [data-testid*="product"], article, li, div'
    );
    if (!root) {
      continue;
    }
    const text = root.textContent ?? "";
    if (!/[£$€]\s?\d/.test(text) && !/\b(USD|EUR|GBP)\b/.test(text)) {
      continue;
    }
    roots.push(root);
  }
  return [...new Set(roots)];
}

async function matchProduct(product, season) {
  const initial = scoreItemForSeason(product, season);
  if (initial.confidence === "high" && initial.score >= 60) {
    return initial;
  }

  const fallbackTokens = await detectDominantColorTokens(product.imageUrl);
  if (fallbackTokens.length === 0) {
    return initial;
  }
  const augmented = scoreItemForSeason(
    {
      ...product,
      colorHints: [...(product.colorHints ?? []), ...fallbackTokens]
    },
    season
  );
  return augmented.score >= initial.score ? augmented : initial;
}

async function scanAndRender() {
  if (!currentState.isActive) {
    return currentState.stats;
  }
  if (!canRun()) {
    return { ...currentState.stats, debug: { reason: "unsupported-site" } };
  }

  const cards = getProductCards(document);
  const productLinkCount = document.querySelectorAll('a[href*="/prd/"], a[href*="/product/"]').length;
  const results = [];
  const seenProductIds = new Set();
  const unparsedReasons = {};
  let unparsed = 0;
  let untracked = 0;
  let recoveredFromUntracked = 0;
  const trackedSet = new Set(cards);
  for (const card of cards) {
    const product = extractProductData(card);
    if (!product) {
      const reason = explainParseFailure(card);
      unparsedReasons[reason] = (unparsedReasons[reason] ?? 0) + 1;
      unparsed += 1;
      markUnparsed(card, reason);
      continue;
    }
    seenProductIds.add(product.id);
    const match = await matchProduct(product, currentState.season);
    results.push({ product, match });

    card.dataset.cshStatus = match.label;
    const hide = shouldHideByFilterMode(match.label);
    card.dataset.cshHidden = hide ? "true" : "false";
    ensureBadge(card, match.label, match.confidence);
  }

  const candidates = getProductLikeCandidates(document);
  for (const candidate of candidates) {
    if (trackedSet.has(candidate)) {
      continue;
    }
    const candidateProduct = extractProductData(candidate);
    if (!candidateProduct) {
      untracked += 1;
      markUntracked(candidate);
      continue;
    }
    if (seenProductIds.has(candidateProduct.id)) {
      continue;
    }
    seenProductIds.add(candidateProduct.id);
    recoveredFromUntracked += 1;

    const match = await matchProduct(candidateProduct, currentState.season);
    results.push({ product: candidateProduct, match });
    candidate.dataset.cshStatus = match.label;
    const hide = shouldHideByFilterMode(match.label);
    candidate.dataset.cshHidden = hide ? "true" : "false";
    ensureBadge(candidate, match.label, match.confidence);
  }

  currentState.stats = {
    ...summarizeResults(results),
    parsed: results.length,
    unparsed,
    untracked,
    unparsedReasons
  };
  return {
    ...currentState.stats,
    debug: {
      cardsFound: cards.length,
      productsParsed: results.length,
      productLinksFound: productLinkCount,
      productLikeCandidates: candidates.length,
      untrackedCandidates: untracked,
      recoveredFromUntracked
    }
  };
}

function sortCardsByMatchScore(results) {
  const rank = {
    Match: 0,
    "Not Match": 1
  };

  const byParent = new Map();
  for (const entry of results) {
    const node = entry.product.cardNode;
    const parent = getSortGroupParent(node);
    if (!parent || !node) {
      continue;
    }
    const sortableNode = getSortableNode(node, parent);
    const list = byParent.get(parent) ?? [];
    list.push({ entry, sortableNode });
    byParent.set(parent, list);
  }

  for (const [parent, list] of byParent.entries()) {
    list.sort((a, b) => {
      const rankDiff = rank[a.entry.match.label] - rank[b.entry.match.label];
      if (rankDiff !== 0) {
        return rankDiff;
      }
      return b.entry.match.score - a.entry.match.score;
    });
    for (const item of list) {
      parent.appendChild(item.sortableNode);
    }
  }
}

function getSortGroupParent(node) {
  if (!node) {
    return null;
  }
  const explicit =
    node.closest('[data-auto-id="productList"]') ??
    node.closest('[data-testid*="product-list"]') ??
    node.closest('[data-testid*="product-grid"]') ??
    node.closest('[role="list"]') ??
    node.closest("ul") ??
    node.closest("ol");
  if (explicit) {
    return explicit;
  }
  return node.parentElement;
}

function getSortableNode(node, parent) {
  let current = node;
  while (current.parentElement && current.parentElement !== parent) {
    current = current.parentElement;
  }
  return current;
}

function clearHighlights() {
  const cards = getProductCards(document);
  for (const card of cards) {
    clearCardDecorations(card);
  }
}

let debouncedTimer;
function scheduleRescan() {
  if (!currentState.isActive || currentState.isBatchLoading) {
    return;
  }
  clearTimeout(debouncedTimer);
  debouncedTimer = setTimeout(async () => {
    if (!currentState.isActive || currentState.isBatchLoading) {
      return;
    }
    await scanAndRender();
    emitStats();
  }, 300);
}

function scheduleDelayedRescans(delays = [300, 1000, 2500]) {
  for (const delay of delays) {
    setTimeout(() => {
      scheduleRescan();
    }, delay);
  }
}

function findLoadMoreTrigger() {
  const candidates = [...document.querySelectorAll("button, a, [role='button']")];
  for (const candidate of candidates) {
    const text = (candidate.textContent ?? "").toLowerCase().trim();
    const matches =
      text.includes("see more") ||
      text.includes("show more") ||
      text.includes("load more") ||
      text.includes("view more");
    if (!matches) {
      continue;
    }
    if (candidate instanceof HTMLButtonElement && candidate.disabled) {
      continue;
    }
    if (candidate.getAttribute("aria-disabled") === "true") {
      continue;
    }
    return candidate;
  }
  return null;
}

function getCurrentItemCount() {
  const cards = getProductCards(document);
  const candidates = getProductLikeCandidates(document);
  return new Set([...cards, ...candidates]).size;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForItemCountIncrease(previousCount, timeoutMs = 7000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await sleep(250);
    const currentCount = getCurrentItemCount();
    if (currentCount > previousCount) {
      return currentCount;
    }
  }
  return getCurrentItemCount();
}

async function loadBatchItems(targetCount) {
  let clicks = 0;
  let currentCount = getCurrentItemCount();
  while (currentCount < targetCount && clicks < 40) {
    const trigger = findLoadMoreTrigger();
    if (!trigger) {
      break;
    }
    trigger.click();
    clicks += 1;
    const nextCount = await waitForItemCountIncrease(currentCount);
    if (nextCount <= currentCount) {
      break;
    }
    currentCount = nextCount;
  }
  return {
    clicks,
    currentCount,
    reachedTarget: currentCount >= targetCount
  };
}

function setupInteractionHooks() {
  if (interactionHooksBound) {
    return;
  }
  interactionHooksBound = true;

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const trigger = target.closest("button, a, [role='button']");
      if (!trigger) {
        return;
      }
      const text = (trigger.textContent ?? "").toLowerCase().trim();
      const likelyLoadMore =
        text.includes("see more") ||
        text.includes("show more") ||
        text.includes("load more") ||
        text.includes("view more");
      if (likelyLoadMore) {
        scheduleDelayedRescans();
      }
    },
    true
  );

  let scrollTimer;
  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scheduleRescan();
      }, 250);
    },
    { passive: true }
  );
}

function emitStats() {
  chrome.runtime.sendMessage({
    type: "csh:stats",
    payload: {
      isActive: currentState.isActive,
      season: currentState.season,
      filterMode: currentState.sessionFilterMode,
      stats: currentState.stats
    }
  });
}

function isProductDetailPage() {
  const path = window.location.pathname.toLowerCase();
  return path.includes("/prd/") || path.includes("/product/");
}

async function maybeResumeSessionOnPageLoad() {
  try {
    const response = await chrome.runtime.sendMessage({ type: "csh:getSessionState" });
    if (!response?.ok || !response.session?.isActive) {
      return;
    }
    currentState.isActive = true;
    currentState.season = response.session.season ?? currentState.season;
    currentState.sessionFilterMode = response.session.filterMode ?? "match";
    currentState.filterMode = isProductDetailPage() ? "all" : currentState.sessionFilterMode;
    await scanAndRender();
    emitStats();
  } catch (_error) {
    // Ignore restore failures; manual scan still works.
  }
}

function setupObserver() {
  if (observer) {
    observer.disconnect();
  }
  observer = new MutationObserver(() => {
    scheduleRescan();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (!canRun()) {
    sendResponse({ ok: false, reason: "unsupported-site" });
    return;
  }

  if (message.type === "csh:scan") {
    currentState.isActive = true;
    currentState.season = message.payload.season ?? currentState.season;
    currentState.filterMode = message.payload.filterMode ?? currentState.filterMode;
    currentState.sessionFilterMode = currentState.filterMode;
    scanAndRender().then((stats) => {
      emitStats();
      sendResponse({ ok: true, stats });
    });
    return true;
  }

  if (message.type === "csh:scanBatch") {
    currentState.isActive = true;
    currentState.season = message.payload.season ?? currentState.season;
    currentState.filterMode = message.payload.filterMode ?? currentState.filterMode;
    currentState.sessionFilterMode = currentState.filterMode;
    const batchSize = Number(message.payload.batchSize) || 100;
    currentState.batchTarget = batchSize;
    currentState.isBatchLoading = true;

    loadBatchItems(currentState.batchTarget)
      .then(async (loadInfo) => {
        currentState.isBatchLoading = false;
        const stats = await scanAndRender();
        emitStats();
        sendResponse({ ok: true, stats: { ...stats, debug: { ...(stats.debug ?? {}), loadInfo } } });
      })
      .catch((error) => {
        currentState.isBatchLoading = false;
        sendResponse({ ok: false, reason: "batch-load-failed", error: error?.message ?? "unknown-error" });
      });
    return true;
  }

  if (message.type === "csh:loadNextBatch") {
    const batchSize = Number(message.payload.batchSize) || 100;
    if (!currentState.isActive) {
      currentState.isActive = true;
    }
    currentState.season = message.payload.season ?? currentState.season;
    currentState.filterMode = message.payload.filterMode ?? currentState.filterMode;
    currentState.sessionFilterMode = currentState.filterMode;
    currentState.batchTarget += batchSize;
    currentState.isBatchLoading = true;

    loadBatchItems(currentState.batchTarget)
      .then(async (loadInfo) => {
        currentState.isBatchLoading = false;
        const stats = await scanAndRender();
        emitStats();
        sendResponse({ ok: true, stats: { ...stats, debug: { ...(stats.debug ?? {}), loadInfo } } });
      })
      .catch((error) => {
        currentState.isBatchLoading = false;
        sendResponse({ ok: false, reason: "batch-load-failed", error: error?.message ?? "unknown-error" });
      });
    return true;
  }

  if (message.type === "csh:setFilter") {
    currentState.filterMode = message.payload.filterMode ?? currentState.filterMode;
    currentState.sessionFilterMode = currentState.filterMode;
    if (!currentState.isActive) {
      sendResponse({ ok: true, stats: currentState.stats, reason: "inactive-until-scan" });
      return;
    }
    scanAndRender().then((stats) => {
      emitStats();
      sendResponse({ ok: true, stats });
    });
    return true;
  }

  if (message.type === "csh:clear") {
    currentState.isActive = false;
    currentState.isBatchLoading = false;
    currentState.batchTarget = 100;
    currentState.filterMode = "match";
    currentState.sessionFilterMode = "match";
    clearHighlights();
    currentState.stats = {
      scanned: 0,
      match: 0,
      noMatch: 0,
      parsed: 0,
      unparsed: 0,
      untracked: 0,
      unparsedReasons: {}
    };
    emitStats();
    sendResponse({ ok: true, stats: currentState.stats });
  }
});

if (canRun()) {
  setupObserver();
  setupInteractionHooks();
  maybeResumeSessionOnPageLoad();
}
