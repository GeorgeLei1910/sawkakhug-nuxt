import {
  SearchCatalogItemsRequest,
  Client,
  Environment,
  BatchRetrieveCatalogObjectsRequest,
  ItemVariationLocationOverrides,
} from "square";
import ShopUtil, {
  Category,
  Item,
  ItemPhoto,
  ItemVariation,
} from "../../../util/types/ShopUtil";
import superjson from "superjson";
import find, { CategoryFinder } from "../categories";

export default defineEventHandler(async (event) => {
  const categoryId: string | undefined = event.context.params?.categoryId;

  if (categoryId === undefined) throw new Error("Bad categoryId");

  const body: SearchCatalogItemsRequest = {
    categoryIds: [categoryId],
    sortOrder: "DESC",
  };

  const photoBody: BatchRetrieveCatalogObjectsRequest = {
    objectIds: [],
  };

  const api: Client = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Production,
  });

  var items: Item[] = [];
  var photoMap: Map<string, string[]> = new Map();
  var photoUrlMap: Map<string, string | null> = new Map();

  var category : Category | null = CategoryFinder.find(categoryId);

  await api.catalogApi.searchCatalogItems(body).then((res) => {
    if (res.statusCode === 200) {
      res.result.items?.forEach((item) => {
        var variations = item.itemData?.variations;
        if (variations == null || variations == undefined) return;
        variations = variations.filter((v) => {
          var overrides : ItemVariationLocationOverrides[] = v.itemVariationData?.locationOverrides!;
          if (overrides == null || overrides.length == 0)
            return false;
          if (overrides[0].soldOut === true)
            return false;
          return true;
        });
        if (variations.length < 1) return;
        var shopItem: Item = ShopUtil.makeItem(item);
        shopItem.variations = variations.map(v => ShopUtil.makeVariation(v.itemVariationData));
        var imgIds : string[] | null | undefined = item.itemData?.imageIds;
        if (imgIds !== null && imgIds !== undefined) {
          photoMap.set(item.id, imgIds);
          photoBody.objectIds.push.apply(photoBody.objectIds, imgIds);
        }
        items.push(shopItem);
      });
    }
  });

  await api.catalogApi.batchRetrieveCatalogObjects(photoBody).then((v) => {
    if (v.statusCode === 200) {
      v.result.objects?.forEach((pic) => {
        var value =
          typeof pic.imageData?.url === undefined
            ? null
            : (pic.imageData?.url as string);
        photoUrlMap.set(pic.id, value);
      });
      items.forEach((item) => {
        item.images = photoMap
          .get(item.id)
          ?.map(
            (imgId) => new ItemPhoto(imgId, photoUrlMap.get(imgId) as string)
          );
      });
    }
  }).catch((err) => {
    return;
  });

  if (category != null){
  category.items = items;
  }

  return superjson.stringify(category) as unknown as typeof category;
});
