export const DEFAULT_SEASON = "warmSpring";

export const SEASON_LABELS = {
  warmSpring: "Warm Spring",
  clearSpring: "Clear Spring",
  softAutumn: "Soft Autumn",
  deepAutumn: "Deep Autumn",
  coolSummer: "Cool Summer",
  lightSummer: "Light Summer",
  brightWinter: "Bright Winter",
  deepWinter: "Deep Winter"
};

export const SEASON_PALETTES = {
  warmSpring: {
    warm: true,
    chroma: "bright",
    value: "light-medium",
    contrast: "medium",
    colors: ["coral", "peach", "tomato", "turquoise", "warm-green", "camel", "ivory"],
    neutrals: ["cream", "warm-beige", "camel"],
    anchors: ["#ff6f61", "#ffb07c", "#27c2b8", "#74b72e", "#f5e6cc", "#c19a6b"]
  },
  clearSpring: {
    warm: true,
    chroma: "bright",
    value: "medium",
    contrast: "high",
    colors: ["bright-coral", "clear-turquoise", "lime", "sun-yellow", "bright-navy", "ivory"],
    neutrals: ["clear-navy", "warm-white", "camel"],
    anchors: ["#ff5f6d", "#00c2c7", "#d0e63a", "#ffd23f", "#1d3f72", "#f7f1dd"]
  },
  softAutumn: {
    warm: true,
    chroma: "soft",
    value: "medium",
    contrast: "low",
    colors: ["olive", "moss", "dusty-coral", "mustard", "terracotta", "soft-teal", "taupe"],
    neutrals: ["taupe", "mushroom", "warm-gray", "cream"],
    anchors: ["#7a8450", "#8a9a5b", "#c27a6a", "#b08d3e", "#b86b4b", "#7b8f87", "#8c7a6b"]
  },
  deepAutumn: {
    warm: true,
    chroma: "medium",
    value: "deep",
    contrast: "medium",
    colors: ["forest", "rust", "aubergine", "deep-teal", "chocolate", "mustard", "brick-red"],
    neutrals: ["dark-olive", "espresso", "camel", "warm-navy"],
    anchors: ["#2f5d3a", "#b7410e", "#4f2e4f", "#1f5c5b", "#5a3a2e", "#a67c2d", "#8f3b2e"]
  },
  coolSummer: {
    warm: false,
    chroma: "soft",
    value: "light-medium",
    contrast: "low",
    colors: ["dusty-rose", "slate-blue", "lavender", "cool-pink", "berry", "soft-navy"],
    neutrals: ["cool-gray", "soft-white", "charcoal"],
    anchors: ["#c48793", "#6b7a99", "#b7a5d8", "#d69ab0", "#8a5d7b", "#6c7480", "#f2f4f7"]
  },
  lightSummer: {
    warm: false,
    chroma: "soft",
    value: "light",
    contrast: "low",
    colors: ["powder-blue", "mint", "light-pink", "periwinkle", "light-lilac", "cool-aqua"],
    neutrals: ["soft-white", "light-gray", "cool-beige"],
    anchors: ["#b0cfe8", "#b9d9c8", "#f3c6d3", "#b9b9e8", "#d7c7e8", "#b9e3e5", "#eff2f5"]
  },
  brightWinter: {
    warm: false,
    chroma: "bright",
    value: "medium-deep",
    contrast: "high",
    colors: ["fuchsia", "electric-blue", "emerald", "true-red", "icy-pink", "black", "white"],
    neutrals: ["black", "white", "icy-gray"],
    anchors: ["#d1007f", "#0066ff", "#00a86b", "#d80032", "#f4d8ff", "#0b0b0f", "#ffffff"]
  },
  deepWinter: {
    warm: false,
    chroma: "bright",
    value: "deep",
    contrast: "high",
    colors: ["burgundy", "pine", "royal-purple", "ink-blue", "cranberry", "black", "white"],
    neutrals: ["black", "charcoal", "cool-white", "deep-navy"],
    anchors: ["#6e1f3f", "#1f4d3a", "#4b2e83", "#1f2f5c", "#9b1b30", "#0b0b0f", "#f8fbff"]
  }
};
