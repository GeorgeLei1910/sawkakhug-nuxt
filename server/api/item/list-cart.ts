import { CatalogItem, CatalogObject, Client, Environment, UpdateOrderRequest } from "square";
import { SawkakhugSquareAPI } from "../../../util/types/ApiUtil";
import {CartUtil,  SCart,  SOrderLineItem } from "../../../util/types/CartUtil";
import { CategoryFinder } from "../categories";
import ShopUtil, { ItemPhoto } from "../../../util/types/ShopUtil";
import SuperJSON from "superjson";


const api: Client = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Production,
  });
  

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log(body.orderId)
    if (body.orderId === null || body.orderId === undefined){
        console.log("No Order Id")
        return emptyCart();
    }

    let currOrder = await api.ordersApi.retrieveOrder(body.orderId)
                              .then((v) => v.result.order);
    console.log("Got Current Order")
    if (currOrder == null || currOrder.lineItems == undefined || currOrder.lineItems.length < 1){
        console.log("Looks like there isnt anything")
        return emptyCart();
    }

    let lineItems : SOrderLineItem [] = currOrder!.lineItems!.map(v => CartUtil.createOrderLineItem(v));
    if (lineItems === undefined) return emptyCart();
    let varItems = await api.catalogApi.batchRetrieveCatalogObjects({
                                    objectIds: lineItems.map(v => v.varId)
                                });
    
    if (varItems.statusCode != 200) return emptyCart();
    var soldOutVarIds : string [] = [], forSaleVarIds : string [] = [], itemIds : string [] = [];
    varItems.result.objects?.forEach((v) =>{
        var override = v.itemVariationData?.locationOverrides;
        if (override == null || override == undefined) return;
        if (override[0].soldOut == true) {
            soldOutVarIds.push(v.id)
        }else{
            forSaleVarIds.push(v.id);
        }
        itemIds.push(v.itemVariationData?.itemId!);
    })

    let items = await api.catalogApi.batchRetrieveCatalogObjects({
        objectIds: itemIds
    })

    let mapVariationToItem : Map<string, CatalogObject> = new Map<string, CatalogObject>();

    if (items.statusCode == 200) {
        items.result.objects?.forEach(v => {
            v.itemData?.variations?.forEach(u =>{
                mapVariationToItem.set(u.id, v)
            })
        })
    }

    let mapVariationToPhoto : Map<string, string> = new Map<string, string>();    
    let photoUrlMap : Map<string, string> = new Map<string, string>();    
    lineItems.forEach(v => {
        let category = CategoryFinder.find(mapVariationToItem.get(v.varId)?.itemData?.categoryId)
        v.categoryColor = category?.color;
        v.categoryName = category?.name;
        mapVariationToPhoto.set(v.varId, mapVariationToItem.get(v.varId)!.itemData!.imageIds![0]);
    })

    let photos = await api.catalogApi.batchRetrieveCatalogObjects({
        objectIds: [...mapVariationToPhoto.values()]
    });

    if (photos.statusCode === 200) {
        photos.result.objects?.forEach((pic) => photoUrlMap.set(pic.id, pic.imageData?.url as string));
        lineItems.forEach((item) => item.photo = mapVariationToPhoto.get(item.varId));
    }

    let removed = await api.ordersApi.updateOrder(currOrder!.id!, {
        order: currOrder,
        fieldsToClear: soldOutVarIds
    });

    let output : SCart = {
        id: currOrder?.id!,
        locationId: currOrder?.locationId!,
        items: lineItems.filter(v => forSaleVarIds.includes(v.varId)),
        soldOut: lineItems.filter(v => soldOutVarIds.includes(v.varId)),
        totalPrice: Number(removed.result.order?.totalMoney?.amount) / 100.00
    }
    
    return SuperJSON.stringify(output) as unknown as typeof output;
  });

  function emptyCart(){
    let output : SCart = {
        id: "",
        locationId: "",
        totalPrice: 0,
        items: [],
        soldOut: []
    }
    return SuperJSON.stringify(output) as unknown as typeof output;
  }
  