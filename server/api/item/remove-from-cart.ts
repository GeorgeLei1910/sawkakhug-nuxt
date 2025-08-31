import {
  Client,
  Environment,
} from "square/legacy";
import { AddToCartResponse, ApiUtils, RemoveFromCartResponse, SawkakhugSquareAPI } from "../../../util/types/ApiUtil";
import SuperJSON from "superjson";
const client : Client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production
});
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.orderId){
    let output : RemoveFromCartResponse = {
      respCode: 404
    }
    return SuperJSON.stringify(output) as unknown as typeof output;
  }

  let currOrder = await client.ordersApi.retrieveOrder(body.orderId)
                            .then((v) => v.result.order);

  let updateResponse = await client.ordersApi.updateOrder(currOrder!.id!, {
    order: {
      locationId: SawkakhugSquareAPI.LOCATION_ID,
      version: currOrder?.version
    },
    fieldsToClear: [`line_items[${body.itemId}]`]
  });


  if (updateResponse.statusCode == 200){
    let output : RemoveFromCartResponse = {
      respCode: 200
    }
    return SuperJSON.stringify(output) as unknown as typeof output;
  }else{
    let output : RemoveFromCartResponse = {
      respCode: 500
    }
    return SuperJSON.stringify(output) as unknown as typeof output;
  }
});
