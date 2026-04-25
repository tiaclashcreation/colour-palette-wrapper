import test from "node:test";
import assert from "node:assert/strict";
import { extractNormalizedColors } from "../../src/engine/color-normalizer.js";
import { scoreItemForSeason, summarizeResults } from "../../src/engine/season-matcher.js";
import { SEASON_LABELS, SEASON_PALETTES } from "../../src/engine/season-palettes.js";

test("season labels include full 12-season model", () => {
  assert.equal(Object.keys(SEASON_LABELS).length, 12);
});

test("adjacent seasons share bridge colors", () => {
  assert.ok(SEASON_PALETTES.lightSpring.colors.includes("mint"));
  assert.ok(SEASON_PALETTES.lightSummer.colors.includes("mint"));
  assert.ok(SEASON_PALETTES.trueAutumn.colors.includes("rust"));
  assert.ok(SEASON_PALETTES.deepAutumn.colors.includes("rust"));
  assert.ok(SEASON_PALETTES.trueWinter.colors.includes("electric-blue"));
  assert.ok(SEASON_PALETTES.brightWinter.colors.includes("electric-blue"));
});

test("extractNormalizedColors maps common synonyms", () => {
  const colors = extractNormalizedColors(["Ivory blazer in wine red"]);
  assert.ok(colors.includes("cream"));
  assert.ok(colors.includes("burgundy"));
});

test("scoreItemForSeason returns strong match for aligned palette", () => {
  const item = {
    title: "Coral peach camel wrap dress",
    colorHints: ["coral peach camel"],
    swatches: []
  };
  const match = scoreItemForSeason(item, "warmSpring");
  assert.equal(match.label, "Strong Match");
  assert.ok(match.score >= 70);
});

test("scoreItemForSeason penalizes opposite warmth", () => {
  const item = {
    title: "Electric blue and fuchsia top",
    colorHints: ["electric blue"],
    swatches: ["fuchsia"]
  };
  const match = scoreItemForSeason(item, "softAutumn");
  assert.equal(match.label, "Not Match");
});

test("scoreItemForSeason returns possible for single palette hit", () => {
  const item = {
    title: "Khaki satin midi skirt",
    colorHints: ["khaki"],
    swatches: []
  };
  const match = scoreItemForSeason(item, "softAutumn");
  assert.equal(match.label, "Possible Match");
  assert.ok(match.score >= 45);
});

test("summarizeResults aggregates buckets", () => {
  const summary = summarizeResults([
    { match: { label: "Strong Match" } },
    { match: { label: "Possible Match" } },
    { match: { label: "Not Match" } }
  ]);
  assert.deepEqual(summary, { scanned: 3, strong: 1, possible: 1, noMatch: 1 });
});
