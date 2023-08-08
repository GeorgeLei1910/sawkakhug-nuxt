import { Client, Environment, Order, PaymentLink } from "square";

export interface EditCartRequest{
    itemId: string,
    orderId: string
}

export interface AddToCartResponse{
    respCode: number,
    error? : string []
    res? : {
        paymentLink?: string,
        url?: string,
        order: Order
    }
}

export interface RemoveFromCartResponse{
    httpCode: number,
    error? : string []
    res? : {
        paymentLink: string,
        url: string,
        order: Order
    }
}

export interface ListCartResponse{
    httpCode: number,
    error? : string []
    res? : {
        paymentLink: string,
        url: string,
        order: Order
    }
}

export class ApiUtils {
    public static makeEditCart(itemId: string, cartId: string) : EditCartRequest{
        let request : EditCartRequest = {
            itemId: itemId,
            orderId: cartId
        }
        return request;
    }

    public static makeAddToCartResponse(paylink : PaymentLink | null, order : Order) : AddToCartResponse{
        let request : AddToCartResponse = {
            res: {
                paymentLink: paylink?.id,
                url: paylink?.url,
                order: order
            },
            respCode: 0
        }
        console.log(request);
        return request;
    }
}

export class SawkakhugSquareAPI {
    private static api : Client;

    public static LOCATION_ID : string = "L8JKG4FT7AG9V";

    public static getInstance() : Client {
        if (SawkakhugSquareAPI.api === null){
            SawkakhugSquareAPI.api = new Client({
                accessToken: process.env.SQUARE_ACCESS_TOKEN,
                environment: Environment.Production,
            });
        }
        return SawkakhugSquareAPI.api
    }
}
export default SawkakhugSquareAPI