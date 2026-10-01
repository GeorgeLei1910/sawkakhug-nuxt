import type { Square } from "square";
import { type AddToCartResponse, ApiUtils, SawkakhugSquareAPI } from "../../utils/ApiUtil";
import { squareClient } from "~/server/utils/square";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body?.itemId) {
    setResponseStatus(event, 400);
    const resp: AddToCartResponse = {
      respCode: 400,
      error: ["Missing item ID"],
    };
    return resp;
  }

  if (!body.orderId) {
    try {
      const paylinkRes = await createNewPaylink(body.itemId);
      const order = paylinkRes.relatedResources?.orders?.[0];
      const resp = ApiUtils.makeAddToCartResponse(paylinkRes.paymentLink, order);
      return resp;
    } catch (exc) {
      console.error("Error creating payment link:", exc);
      setResponseStatus(event, 500);
      const resp: AddToCartResponse = {
        respCode: 500,
        error: ["Failed to create checkout session"],
      };
      return resp;
    }
  }

  try {
    const orderRes = await squareClient.orders.get({ orderId: body.orderId });
    const currOrder = orderRes.order;

    if (!currOrder) {
      setResponseStatus(event, 404);
      const resp: AddToCartResponse = {
        respCode: 404,
        error: ["Order not found"],
      };
      return resp;
    }

    if (checkDuplicates(currOrder, body.itemId)) {
      setResponseStatus(event, 400);
      const resp: AddToCartResponse = {
        respCode: 400,
        error: ["Item Already Added"],
      };
      return resp;
    }

    const updateResponse = await squareClient.orders.update({
      orderId: currOrder.id!,
      order: {
        locationId: SawkakhugSquareAPI.LOCATION_ID,
        lineItems: [
          {
            quantity: "1",
            catalogObjectId: body.itemId,
            itemType: "ITEM",
          },
        ],
        version: currOrder.version,
      },
    });

    if (updateResponse.order) {
      return ApiUtils.makeAddToCartResponse(null, updateResponse.order);
    } else {
      setResponseStatus(event, 404);
      const resp: AddToCartResponse = {
        respCode: 404,
        error: ["Can't Add Item"],
      };
      return resp;
    }
  } catch (err) {
    console.error("Error updating order in Square:", err);
    setResponseStatus(event, 500);
    const resp: AddToCartResponse = {
      respCode: 500,
      error: ["Can't Add Item"],
    };
    return resp;
  }
});

async function createNewPaylink(itemId: string) {
  return await squareClient.checkout.paymentLinks.create({
    order: {
      locationId: SawkakhugSquareAPI.LOCATION_ID,
      lineItems: [
        {
          quantity: "1",
          catalogObjectId: itemId,
          itemType: "ITEM",
        },
      ],
    },
    checkoutOptions: {
      askForShippingAddress: true,
      acceptedPaymentMethods: {
        applePay: true,
        googlePay: true,
        cashAppPay: true,
      },
    },
  });
}

function checkDuplicates(currOrder: Square.Order, itemId: string): boolean {
  return currOrder.lineItems?.some((item) => item.catalogObjectId === itemId) ?? false;
}

