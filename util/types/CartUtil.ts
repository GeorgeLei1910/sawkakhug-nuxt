import { ApiResponse, CatalogItem, CatalogItemVariation, CatalogObject, Money, Order, OrderLineItem, SearchCatalogItemsResponse } from "square";

export interface SOrderLineItem{
    varId: string,
    uid: string,
    name: string,
    categoryName?: string,
    categoryColor?: string,
    totalMoney: number
    photo?: string,
    variationName: string
}

export interface SCart{
    id: string,
    locationId: string,
    totalPrice: number,
    items: SOrderLineItem[]
    soldOut: SOrderLineItem[]
}

export class CartUtil{
    public static createOrderLineItem(cat : any) : SOrderLineItem {
        let output : SOrderLineItem = {
            varId: cat.catalogObjectId,
            uid: cat.uid,
            name: cat.name,
            totalMoney: Number(cat.totalMoney.amount) / 100.00,
            variationName: cat.variationName
        }
        return output;
    }

    public static createCart(cat : Order) : SCart {
        let output : SCart = {
            id: cat.id!,
            locationId: cat.locationId,
            totalPrice: Number(cat.totalMoney?.amount) / 100.00,
            items: [],
            soldOut: []
        }
        return output;
    }
}

export default CartUtil;

