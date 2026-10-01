import { squareClient } from "~/server/utils/square";
import { type RemoveFromCartResponse, SawkakhugSquareAPI } from "../../utils/ApiUtil";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const lineItemUid = body?.lineItemUid || body?.itemId;

  if (!body?.orderId || !lineItemUid) {
    setResponseStatus(event, 400);
    const output: RemoveFromCartResponse = {
      respCode: 400,
      error: ["Missing orderId or line item identifier"],
    };
    return output;
  }

  try {
    const orderRes = await squareClient.orders.get({ orderId: body.orderId });
    const currOrder = orderRes.order;

    if (!currOrder) {
      setResponseStatus(event, 404);
      const output: RemoveFromCartResponse = {
        respCode: 404,
        error: ["Order not found"],
      };
      return output;
    }

    const updateResponse = await squareClient.orders.update({
      orderId: currOrder.id!,
      order: {
        locationId: SawkakhugSquareAPI.LOCATION_ID,
        version: currOrder.version,
      },
      fieldsToClear: [`line_items[${lineItemUid}]`],
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
  } catch (err) {
    console.error("Error removing item from cart in Square:", err);
    setResponseStatus(event, 500);
    const output: RemoveFromCartResponse = {
      respCode: 500,
      error: ["Error removing item from cart"],
    };
    return output;
  }
});

