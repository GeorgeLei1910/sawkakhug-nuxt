import type { Square } from "square";
import type { SCart } from "./CartUtil";
import { squareLocationId } from "./square";

export interface EditCartRequest {
  itemId: string;
  orderId: string;
}

export interface AddToCartResponse {
  respCode: number;
  error?: string[];
  res?: {
    paymentLink?: string;
    url?: string;
    order?: Square.Order;
  };
}

export interface RemoveFromCartResponse {
  respCode: number;
  error?: string[];
  res?: {
    paymentLink?: string;
    url?: string;
    order?: Square.Order;
  };
}

export interface ListCartResponse {
  httpCode: number;
  error?: string[];
  res?: {
    paymentLink?: string;
    url?: string;
    cart?: SCart;
  };
}

export function sanitizeBigInt<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );
}

export class ApiUtils {
  public static makeEditCart(itemId: string, cartId: string): EditCartRequest {
    return {
      itemId,
      orderId: cartId,
    };
  }

  public static makeAddToCartResponse(
    paylink: Square.PaymentLink | null | undefined,
    order?: Square.Order
  ): AddToCartResponse {
    return {
      res: {
        paymentLink: paylink?.id,
        url: paylink?.url,
        order: order ? sanitizeBigInt(order) : undefined,
      },
      respCode: 200,
    };
  }
}

export class SawkakhugSquareAPI {
  public static get LOCATION_ID(): string {
    return squareLocationId;
  }
}

