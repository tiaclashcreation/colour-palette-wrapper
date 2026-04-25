import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { AsosAdapter } from "../../src/adapters/asos-adapter.js";

test("AsosAdapter extracts product metadata from fixture grid", () => {
  const html = readFileSync(new URL("../fixtures/asos-grid.html", import.meta.url), "utf8");
  const dom = new JSDOM(html);
  const adapter = new AsosAdapter();
  const cards = adapter.getProductCards(dom.window.document);
  assert.equal(cards.length, 2);

  const first = adapter.extractProductData(cards[0]);
  assert.equal(first.title, "ASOS DESIGN warm spring coral midi dress");
  assert.equal(first.colorHints[0], "Coral");
  assert.match(first.url, /product-one/);
});
