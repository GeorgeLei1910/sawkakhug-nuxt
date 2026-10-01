import type { Square } from "square";
import { CartUtil, type SCart, type SOrderLineItem } from "../../utils/CartUtil";
import { SawkakhugSquareAPI } from "../../utils/ApiUtil";
import { CategoryFinder } from "../categories";
import type { Category } from "../../utils/ShopUtil";
import { squareClient } from "../../utils/square";

export default defineEventHandler(async (event): Promise<SCart> => {
  const body = await readBody(event);
  if (!body?.orderId) {
    return emptyCart();
  }

  try {
    const orderRes = await squareClient.orders.get({ orderId: body.orderId });
    const currOrder = orderRes.order;

    if (!currOrder || !currOrder.lineItems || currOrder.lineItems.length < 1) {
      return emptyCart();
    }

    const lineItems: SOrderLineItem[] = currOrder.lineItems.map((v) => CartUtil.createOrderLineItem(v));

    const varItems = await squareClient.catalog.batchGet({
      objectIds: lineItems.map((v) => v.varId),
      includeRelatedObjects: true,
    });

    if (!varItems.objects) return emptyCart();

    const soldOutVarIds: string[] = [];
    const forSaleVarIds: string[] = [];
    const varToItemId = new Map<string, string>();
    const itemIds: string[] = [];

    varItems.objects.forEach((v) => {
      if (v.type !== "ITEM_VARIATION" || !v.id) return;

      const itemId = v.itemVariationData?.itemId;
      if (itemId) {
        varToItemId.set(v.id, itemId);
        if (!itemIds.includes(itemId)) {
          itemIds.push(itemId);
        }
      }

      const override = v.itemVariationData?.locationOverrides;
      if (override && override.length > 0 && override[0].soldOut === true) {
        soldOutVarIds.push(v.id);
      } else {
        forSaleVarIds.push(v.id);
      }
    });

    const itemMap = new Map<string, Square.CatalogObject.Item>();

    varItems.relatedObjects?.forEach((obj) => {
      if (obj.type === "ITEM" && obj.id) {
        itemMap.set(obj.id, obj as Square.CatalogObject.Item);
      }
    });

    const missingItemIds = itemIds.filter((id) => !itemMap.has(id));
    if (missingItemIds.length > 0) {
      const items = await squareClient.catalog.batchGet({
        objectIds: missingItemIds,
      });

      items.objects?.forEach((v) => {
        if (v.type === "ITEM" && v.id) {
          itemMap.set(v.id, v as Square.CatalogObject.Item);
        }
      });
    }

    const mapVariationToPhoto = new Map<string, string>();
    const photoUrlMap = new Map<string, string>();

    lineItems.forEach((v) => {
      const itemId = varToItemId.get(v.varId);
      const item = itemId ? itemMap.get(itemId) : undefined;

      const possibleCategoryIds: string[] = [];
      if (item?.itemData?.categoryId) {
        possibleCategoryIds.push(item.itemData.categoryId);
      }
      if (item?.itemData?.categories) {
        for (const cat of item.itemData.categories) {
          if (cat.id) possibleCategoryIds.push(cat.id);
        }
      }

      let category: Category | null = null;
      for (const catId of possibleCategoryIds) {
        category = CategoryFinder.find(catId);
        if (category) break;
      }

      v.categoryColor = category?.color;
      v.categoryName = category?.name;
      const photoId = item?.itemData?.imageIds?.[0];
      if (photoId) {
        mapVariationToPhoto.set(v.varId, photoId);
      }
    });

    const photoIdsToFetch = [...mapVariationToPhoto.values()];
    if (photoIdsToFetch.length > 0) {
      const photos = await squareClient.catalog.batchGet({
        objectIds: photoIdsToFetch,
      });

      photos.objects?.forEach((pic) => {
        if (pic.type === "IMAGE" && pic.id && pic.imageData?.url) {
          photoUrlMap.set(pic.id, pic.imageData.url);
        }
      });

      lineItems.forEach((item) => {
        const photoId = mapVariationToPhoto.get(item.varId);
        if (photoId) {
          item.photo = photoUrlMap.get(photoId);
        }
      });
    }

    const soldOutUids = currOrder.lineItems
      .filter((item) => item.catalogObjectId && soldOutVarIds.includes(item.catalogObjectId) && item.uid)
      .map((item) => `line_items[${item.uid}]`);

    let finalOrder = currOrder;
    if (soldOutUids.length > 0) {
      const removed = await squareClient.orders.update({
        orderId: currOrder.id!,
        order: {
          locationId: SawkakhugSquareAPI.LOCATION_ID,
          version: currOrder.version,
        },
        fieldsToClear: soldOutUids,
      });
      if (removed.order) {
        finalOrder = removed.order;
      }
    }

    const output: SCart = {
      id: finalOrder.id!,
      locationId: finalOrder.locationId ?? "",
      items: lineItems.filter((v) => forSaleVarIds.includes(v.varId)),
      soldOut: lineItems.filter((v) => soldOutVarIds.includes(v.varId)),
      totalPrice: Number(finalOrder.totalMoney?.amount ?? 0) / 100.0,
    };

    return output;
  } catch (err) {
    console.error("Error listing cart from Square:", err);
    return emptyCart();
  }
});

function emptyCart(): SCart {
  return {
    id: "",
    locationId: "",
    totalPrice: 0,
    items: [],
    soldOut: [],
  };
}