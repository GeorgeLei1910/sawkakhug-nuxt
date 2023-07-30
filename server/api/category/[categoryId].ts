import {
    SearchCatalogItemsRequest,
    Client,
    Environment,
    BatchRetrieveCatalogObjectsRequest,
  } from "square";
import ShopUtil, { Category, Item, ItemPhoto } from "../../../util/types/ShopUtil";
import superjson from "superjson";
import find, { CategoryFinder } from "../categories";

export default defineEventHandler(async (event) => {

    const categoryId : string | undefined = event.context.params?.categoryId;

    if (categoryId === undefined) throw new Error("Bad categoryId");

    const body: SearchCatalogItemsRequest = {
    categoryIds: [categoryId],
    sortOrder: 'DESC'
    };

    const photoBody : BatchRetrieveCatalogObjectsRequest = {
      objectIds: []
    }
    
    const api: Client = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Production,
    });

    var items : Item[] = [];
    //Map <itemId, Map<photoId, photoUrl>>
    var photoMap : Map<string, string[]> = new Map();
    var photoUrlMap : Map<string, string | null> = new Map();

    await api.catalogApi.searchCatalogItems(body)
    .then(res => {
      if (res.statusCode === 200){
        res.result.items?.forEach(item => {
          var shopItem : Item = ShopUtil.makeItem(item);
          var imgIds = item.itemData?.imageIds;
          if (imgIds !== null && imgIds !== undefined){
            imgIds?.forEach((v) => {
              shopItem.images?.push(new ItemPhoto(v, ""))
            })
            photoMap.set(item.id, imgIds);
            photoBody.objectIds = photoBody.objectIds.concat(imgIds);
          }
          items.push(shopItem);
        })
      }
    });


    await api.catalogApi.batchRetrieveCatalogObjects(photoBody).then(v => {
      if (v.statusCode === 200){
        v.result.objects?.forEach(pic =>{
          var value = typeof pic.imageData?.url === undefined ? null : pic.imageData?.url as string;
          photoUrlMap.set(pic.id, value)
        });
        items.forEach(item => {
          item.images = photoMap.get(item.id)?.map(imgId => 
            new ItemPhoto(imgId, photoUrlMap.get(imgId) as string))
        })
      }
    })


    return superjson.stringify(items) as unknown as typeof items;
});
