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

function normalizeToken(token) {
  const compact = token.toLowerCase().trim().replace(/[^a-z]/g, "");
  return COLOR_SYNONYMS[compact] ?? null;
}

export function extractNormalizedColors(inputs) {
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

export function inferWarmth(colorToken) {
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
