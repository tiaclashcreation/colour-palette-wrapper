export class BaseAdapter {
  canHandle(_url) {
    return false;
  }

  getProductCards(_documentRef = document) {
    return [];
  }

  extractProductData(_cardNode) {
    return null;
  }
}

export function cardIdFromLink(linkHref) {
  if (!linkHref) {
    return null;
  }
  const trimmed = linkHref.split("?")[0];
  return trimmed.toLowerCase();
}
