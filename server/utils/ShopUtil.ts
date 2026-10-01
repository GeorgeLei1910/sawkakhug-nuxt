import type { Square } from "square";

export interface SuperCategory {
  name: string;
  description: string;
  show: boolean;
  subcategories: Category[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  description: string | null;
  imagePath: string | null;
  items: Item[];
}

export interface Item {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  images?: ItemPhoto[];
  variations?: ItemVariation[];
}

export interface ItemVariation {
  variationId: string;
  variationName: string;
  price: number;
  currency: string;
}

export interface ItemPhoto {
  id: string;
  url?: string;
}

export class ShopUtil {
  static makeItemPhoto(id: string, url: string): ItemPhoto {
    return { id, url };
  }

  public static makeCategory(cat: {
    id: string;
    title: string;
    color: string;
    desc: string | null;
    picture?: string | null;
  }): Category {
    return {
      id: cat.id,
      name: cat.title,
      color: cat.color,
      description: cat.desc,
      imagePath: cat.picture ?? null,
      items: [],
    };
  }

  public static makeItem(catObj: Square.CatalogObject): Item {
    const itemData = catObj.item;
    return {
      id: catObj.id ?? "",
      categoryId: itemData?.categoryId ?? "",
      name: itemData?.name ?? "",
      description: itemData?.description ?? "",
    };
  }

  public static makeVariation(variation: Square.CatalogObject): ItemVariation {
    const vData = variation.itemVariationData;
    return {
      variationId: variation.id ?? "",
      variationName: vData?.name ?? "",
      price: Number(vData?.priceMoney?.amount ?? 0) / 100.0,
      currency: vData?.priceMoney?.currency ?? "CAD",
    };
  }

  public static makeSuperCategory(supCat: {
    title: string;
    desc: string;
    subcategories: Array<{
      id: string;
      title: string;
      color: string;
      desc: string | null;
      picture?: string | null;
    }>;
  }): SuperCategory {
    return {
      name: supCat.title,
      description: supCat.desc,
      subcategories: supCat.subcategories.map((s) => ({
        id: s.id,
        name: s.title,
        color: s.color,
        description: s.desc,
        imagePath: s.picture ?? null,
        items: [],
      })),
      show: false,
    };
  }
}

export default ShopUtil;

