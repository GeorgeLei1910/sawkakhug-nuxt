import {
  CreatePaymentLinkRequest,
  Order,
  UpdateOrderRequest,
} from "square";
import { AddToCartResponse, ApiUtils, SawkakhugSquareAPI } from "../../../util/types/ApiUtil";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (body.orderId == null){

  }

  let currOrder = await SawkakhugSquareAPI.getInstance()
                            .ordersApi.retrieveOrder(body.orderId)
                            .then((v) => v.result.order);
  
  let order : Order = {
    locationId: SawkakhugSquareAPI.LOCATION_ID,
    version: currOrder?.version
  }

  let updateResponse = SawkakhugSquareAPI.getInstance().ordersApi.updateOrder(currOrder!.id!, {
    order: order,
    fieldsToClear: [body.uri]
  });

  return { body };
});
