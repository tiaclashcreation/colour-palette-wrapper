import { BaseAdapter, cardIdFromLink } from "./base-adapter.js";

const SELECTORS = {
  card: '[data-auto-id="productTile"]',
  title: '[data-auto-id="productTileDescription"]',
  link: "a",
  image: "img",
  swatchText: '[data-auto-id="productTileColour"], [data-testid="colourway"]'
};

export class AsosAdapter extends BaseAdapter {
  canHandle(url) {
    return url.includes("asos.com");
  }

  getProductCards(documentRef = document) {
    return [...documentRef.querySelectorAll(SELECTORS.card)];
  }

  extractProductData(cardNode) {
    const titleNode = cardNode.querySelector(SELECTORS.title);
    const linkNode = cardNode.querySelector(SELECTORS.link);
    const imageNode = cardNode.querySelector(SELECTORS.image);
    const swatchNode = cardNode.querySelector(SELECTORS.swatchText);

    const title = titleNode?.textContent?.trim() ?? "";
    const url = linkNode?.href ?? "";
    const id = cardIdFromLink(url) ?? title;
    const swatchText = swatchNode?.textContent?.trim() ?? "";

    if (!id || !title) {
      return null;
    }

    return {
      id,
      title,
      url,
      imageUrl: imageNode?.currentSrc || imageNode?.src || "",
      colorHints: [swatchText].filter(Boolean),
      swatches: [swatchText].filter(Boolean),
      cardNode
    };
  }
}

export function getAsosSelectorStrategy() {
  return {
    site: "ASOS",
    productCard: SELECTORS.card,
    title: SELECTORS.title,
    link: SELECTORS.link,
    image: SELECTORS.image,
    swatchText: SELECTORS.swatchText
  };
}
