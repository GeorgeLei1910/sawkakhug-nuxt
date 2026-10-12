import { squareClient } from "~/server/utils/square";
import { type RemoveFromCartResponse, SawkakhugSquareAPI } from "../../utils/ApiUtil";

export default defineEventHandler(async (event) => {
  // Support both body and query parameters (Cloudflare/proxies often drop bodies on DELETE)
  let body: any = {};
  try {
    body = await readBody(event);
  } catch {
    body = {};
  }

  const query = getQuery(event);
  const orderId = body?.orderId || query?.orderId;
  const lineItemIdentifier =
    body?.lineItemUid || body?.itemId || query?.lineItemUid || query?.itemId;

  if (!orderId || !lineItemIdentifier) {
    setResponseStatus(event, 400);
    const output: RemoveFromCartResponse = {
      respCode: 400,
      error: ["Missing orderId or line item identifier"],
    };
    return output;
  }

  try {
    const orderRes = await squareClient.orders.get({ orderId });
    const currOrder = orderRes.order;

    if (!currOrder) {
      setResponseStatus(event, 404);
      const output: RemoveFromCartResponse = {
        respCode: 404,
        error: ["Order not found"],
      };
      return output;
    }

    // Match the target item either by Square line item uid or catalogObjectId
    const targetLineItem = currOrder.lineItems?.find(
      (item) =>
        item.uid === lineItemIdentifier ||
        item.catalogObjectId === lineItemIdentifier
    );

    // If item is already not in the order, treat as successful removal
    if (!targetLineItem || !targetLineItem.uid) {
      return {
        respCode: 200,
        res: {
          order: currOrder,
        },
      } satisfies RemoveFromCartResponse;
    }

    const updateResponse = await squareClient.orders.update({
      orderId: currOrder.id!,
      order: {
        locationId: currOrder.locationId || SawkakhugSquareAPI.LOCATION_ID,
        version: currOrder.version,
      },
      fieldsToClear: [`line_items[${targetLineItem.uid}]`],
    });

    if (updateResponse.order) {
      return {
        respCode: 200,
        res: {
          order: updateResponse.order,
        },
      } satisfies RemoveFromCartResponse;
    } else {
      setResponseStatus(event, 500);
      const output: RemoveFromCartResponse = {
        respCode: 500,
        error: ["Failed to remove line item"],
      };
      return output;
    }
  } catch (err: any) {
    console.error("Error removing item from cart in Square:", err);
    setResponseStatus(event, 500);
    const output: RemoveFromCartResponse = {
      respCode: 500,
      error: [err?.message || "Error removing item from cart"],
    };
    return output;
  }
});

