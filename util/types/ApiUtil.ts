import { Client, Environment, Order, PaymentLink } from "square";
import { SCart } from "./CartUtil";

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
    respCode: number,
    error? : string  []
    res? : {
        paymentLink: string,
        url: string,
        order?: Order
    }
}

export interface ListCartResponse{
    httpCode: number,
    error? : string []
    res? : {
        paymentLink: string,
        url: string,
        cart: SCart
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
            respCode: 200
        }
        console.log(request);
        return request;
    }
}

export class SawkakhugSquareAPI {
    private static api : Client;

    public static LOCATION_ID : string = "L8JKG4FT7AG9V";
}
