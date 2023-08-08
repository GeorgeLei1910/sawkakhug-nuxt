import {
  Client,
  CreatePaymentLinkRequest,
  Environment,
  Order,
  UpdateOrderRequest,
} from "square";
import { AddToCartResponse, ApiUtils, SawkakhugSquareAPI } from "../../../util/types/ApiUtil";
import SuperJSON from "superjson";


const api: Client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production,
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("Got body")
  var res : AddToCartResponse;

  if (body.orderId === null || body.orderId === undefined) {
    return await createNewPaylink(body.itemId)
                    .then(v => ApiUtils.makeAddToCartResponse(v.result.paymentLink!, v.result.relatedResources!.orders![0]))
                    .then(v => SuperJSON.stringify(v) as unknown as typeof v);
  }
  

  let currOrder = await api
                            .ordersApi.retrieveOrder(body.orderId)
                            .then((v) => v.result.order);

  if (checkDuplicates(currOrder!, body.itemId)){
    return null;
  }
  

  let updateResponse = await api.ordersApi.updateOrder(currOrder!.id!, {
    order : {
      locationId : SawkakhugSquareAPI.LOCATION_ID,
      lineItems: [{
          quantity: "1",
          catalogObjectId: body.itemId,
          itemType:'ITEM'
      }],
      version: currOrder?.version
  }});

  if (updateResponse.statusCode == 200){
     let resp = ApiUtils.makeAddToCartResponse(null, updateResponse.result.order!)
     return SuperJSON.stringify(resp) as unknown as typeof resp;
  }else{
    let resp : AddToCartResponse = {
      respCode: 404,
      error: ["I don't understand"]
    }
    return SuperJSON.stringify(resp) as unknown as typeof resp;
  }
});

async function createNewPaylink(itemId: string) {
  let paylinkRequest: CreatePaymentLinkRequest = {
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
  };
  console.log(paylinkRequest)
  let paymentLink =
    await api.checkoutApi.createPaymentLink(
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
