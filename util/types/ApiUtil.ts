import { Client, Environment, Order, PaymentLink } from "square";

export interface AddToCartRequest{
    itemId: string,
    cartId: string
}

export interface AddToCartResponse{
    error? : string []
    res? : {
        paymentLink: string,
        url: string,
        order: Order
    }
}

export class ApiUtils {
    public static makeAddToCart(itemId: string, cartId: string) : AddToCartRequest{
        let request : AddToCartRequest = {
            itemId: itemId,
            cartId: cartId
        }
        return request;
    }

    public static makeAddToCartResponse(paylink : PaymentLink, order : Order) : AddToCartResponse{
        let request : AddToCartResponse = {
            res : {
                paymentLink: paylink.id!,
                url: paylink.url!,
                order: order
            }
        }
        return request;
    }
}

export class SawkakhugSquareAPI {
    private static api : Client;
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