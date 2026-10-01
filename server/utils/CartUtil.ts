import type { Square } from "square";

export interface SOrderLineItem {
  varId: string;
  uid: string;
  name: string;
  categoryName?: string;
  categoryColor?: string;
  totalMoney: number;
  photo?: string;
  variationName: string;
}

export interface SCart {
  id: string;
  locationId: string;
  totalPrice: number;
  items: SOrderLineItem[];
  soldOut: SOrderLineItem[];
}

export class CartUtil {
  public static createOrderLineItem(cat: Square.OrderLineItem): SOrderLineItem {
    return {
      varId: cat.catalogObjectId ?? "",
      uid: cat.uid ?? "",
      name: cat.name ?? "",
      totalMoney: Number(cat.totalMoney?.amount ?? 0) / 100.0,
      variationName: cat.variationName ?? "",
    };
  }

  public static createCart(cat: Square.Order): SCart {
    return {
      id: cat.id ?? "",
      locationId: cat.locationId ?? "",
      totalPrice: Number(cat.totalMoney?.amount ?? 0) / 100.0,
      items: [],
      soldOut: [],
    };
  }
}

export default CartUtil;

