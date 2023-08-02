import {
  CreatePaymentLinkRequest,
  Order,
  UpdateOrderRequest,
} from "square";
import { AddToCartResponse, ApiUtils, SawkakhugSquareAPI } from "../../../util/types/ApiUtil";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  var res : AddToCartResponse;

  if (body.cartId === null) {
    return await createNewPaylink(body.itemId)
                    .then((v) => ApiUtils.makeAddToCartResponse(v.result.paymentLink!, v.result.relatedResources!.orders![0]));
  }
  

  let currOrder = await SawkakhugSquareAPI.getInstance()
                            .ordersApi.retrieveOrder(body.orderId)
                            .then((v) => v.result.order);

  if (checkDuplicates(currOrder!, body.itemId)){
    return null;
  }
  
  let updateOrder : UpdateOrderRequest = {
    order: {
        locationId : "",
        lineItems: [{
            quantity: "1",
            catalogObjectId: body.itemId,
            itemType:'ITEM'
        }],
        version: currOrder?.version
    }
  }

  let updateResponse = SawkakhugSquareAPI.getInstance().ordersApi.updateOrder(currOrder!.id!, updateOrder);

  return { body };
});

async function createNewPaylink(itemId: string) {
  let paylinkRequest: CreatePaymentLinkRequest = {
    order: {
      locationId: "",
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
  };
  let paymentLink =
    await SawkakhugSquareAPI.getInstance().checkoutApi.createPaymentLink(
      paylinkRequest
    );
  return paymentLink;
}

function checkDuplicates(currOrder: Order, itemId: string) {
  if (currOrder == null) return false;
  var itemIds: string[] = [];
  if (currOrder.lineItems == null) return false;
  currOrder.lineItems.forEach((item) => {
    if (item.catalogObjectId !== null) {
      itemIds.push(item.catalogObjectId!);
    }
  });
  if (itemIds.length < 1) return false;
  if (itemIds.indexOf(itemId) != -1) {
    return true;
  }
  return false;
}
