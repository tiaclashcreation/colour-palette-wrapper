# ASOS Selector Strategy (MVP)

Target site for v1 is **ASOS** (`https://www.asos.com/*`).

## Selector Map
- Product card: `[data-auto-id="productTile"]`
- Product title: `[data-auto-id="productTileDescription"]`
- Product link: `a`
- Product image: `img`
- Visible colour metadata: `[data-auto-id="productTileColour"], [data-testid="colourway"]`

## Data extracted per card
- `id`: normalized link URL (without query string) fallback to title text
- `title`: product title text
- `url`: product detail URL
- `imageUrl`: image source from tile image
- `colorHints`: visible colour metadata text
- `swatches`: same as color hints in MVP; extend later if swatch chips are available

## Resilience plan
- Keep selectors centralized in `src/adapters/asos-adapter.js`.
- Use mutation-observer based rescanning for infinite scroll/load more pages.
- Add fixture-based tests to detect breakage when ASOS changes DOM structure.
