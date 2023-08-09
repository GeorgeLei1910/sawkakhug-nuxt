import {
  Client,
  CreatePaymentLinkRequest,
  Environment,
  Order,
  UpdateOrderRequest,
} from "square";
import { AddToCartResponse, ApiUtils, SawkakhugSquareAPI } from "../../../util/types/ApiUtil";
const client : Client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox
});
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (body.orderId == null){

  }

  let currOrder = await client
                            .ordersApi.retrieveOrder(body.orderId)
                            .then((v) => v.result.order);
  
  let order : Order = {
    locationId: SawkakhugSquareAPI.LOCATION_ID,
    version: currOrder?.version
  }

  let updateResponse = client.ordersApi.updateOrder(currOrder!.id!, {
    order: order,
    fieldsToClear: [body.uri]
  });

  return { body };
});
