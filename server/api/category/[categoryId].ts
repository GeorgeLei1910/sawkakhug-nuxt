import type { Square } from "square";
import { CategoryFinder } from "../categories";
import ShopUtil, { type Category, type Item } from "../../utils/ShopUtil";
import { squareClient } from "../../utils/square";

export default defineEventHandler(async (event) => {
  const categoryId: string | undefined = event.context.params?.categoryId;

  if (!categoryId) {
    throw createError({ statusCode: 400, statusMessage: "Invalid categoryId" });
  }

  const items: Item[] = [];
  const photoMap = new Map<string, string[]>();
  const photoUrlMap = new Map<string, string | null>();
  const photoIds: string[] = [];

  const category: Category | null = CategoryFinder.find(categoryId);

  try {
    const res = await squareClient.catalog.searchItems({
      categoryIds: [categoryId],
      sortOrder: "DESC",
    });

    res.items?.forEach((item: Square.CatalogObject) => {
      if (item.type !== "ITEM") return;
      let variations = item.itemData?.variations;
      if (variations == null || variations == undefined) return;

      variations = variations.filter((v: Square.CatalogObject) => {
        if (v.type !== "ITEM_VARIATION") return false;
        const overrides = v.itemVariationData?.locationOverrides;
        if (overrides == null || overrides.length === 0) return false;
        if (overrides[0].soldOut === true) return false;
        return true;
      });

      if (variations.length < 1) return;

      const shopItem: Item = ShopUtil.makeItem(item);
      shopItem.variations = variations.map((v: Square.CatalogObject) => ShopUtil.makeVariation(v));

      const imgIds = item.itemData?.imageIds;
      if (item.id && imgIds && imgIds.length > 0) {
        photoMap.set(item.id, imgIds);
        photoIds.push(...imgIds);
      }
      items.push(shopItem);
    });

    if (photoIds.length > 0) {
      const photoRes = await squareClient.catalog.batchGet({
        objectIds: photoIds,
      });

      photoRes.objects?.forEach((pic: Square.CatalogObject) => {
        if (pic.type === "IMAGE" && pic.id) {
          photoUrlMap.set(pic.id, pic.imageData?.url ?? null);
        }
      });

      items.forEach((item) => {
        item.images = photoMap
          .get(item.id)
          ?.map((imgId) => ShopUtil.makeItemPhoto(imgId, photoUrlMap.get(imgId) as string));
      });
    }
  } catch (err) {
    console.error("Error retrieving category items from Square:", err);
  }

  if (category != null) {
    category.items = items;
  }

  return category;
});
