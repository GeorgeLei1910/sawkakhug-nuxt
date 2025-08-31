import superjson from "superjson";
import { Category, ShopUtil, SuperCategory } from "../../util/types/ShopUtil";
import { BatchRetrieveCatalogObjectsRequest, Client, Environment } from "square/legacy";

const base = [
  {
    "title": "TSUMUGI",
    "desc" : "Japanese word for spinning / weaving",
    "subcategories" : [{
      "id": "53K3J566MVBHXG6P4L2YRXOT",
      "title": "Shape of Hug",
      "color": "1fb592",
      "desc": "Tsumugi also means \"to put together the thoughts and emotions"
    },
    {
      "id": "DMSJDGUTXTINPOVHNNULYQKY",
      "title": "Sorala",
      "color": "1cc6ff",
      "desc": "\"Sora\" means sky in Japanese. These are the works which was inspired by sky"
    },
    {
      "id": "UJDMB2JTZJVTD4PPRJGBGEUZ",
      "title": "Matou",
      "color": "fca903",
      "desc": "Matou means: \n " 
      + "* to wear / to put on (clothing, a garment, or something draped around the body \) \n"
      + " * to be wrapped in / to be enveloped in (literally or figuratively, e.g. “shrouded in mist” or “cloaked in mystery”\)\n " 
      + "* the scent coming from the person"
    },
    {
      "id": "HUOA7FSTHWH6YEOWUTSVEABP",
      "title": "A Shape of Prayers",
      "color": "fc03a5",
      "desc": "Passing the cooperate prayers to others…"
    }]
  }]


export class CategoryFinder {
  public static find (id : string | null | undefined) : Category | null{
    if (id === null || id === undefined) return null;
    let res: Category | null = null;
    console.log("Find ID: " + id)
    base.forEach((supcat) => {
      supcat.subcategories.forEach(subcat => {
        if (subcat.id == id)
          res = ShopUtil.makeCategory(subcat);
      });
    });
    return res;
  }
}

var photoMap: Map<string, string[]> = new Map();
var photoUrlMap: Map<string, string | null> = new Map();

export default defineEventHandler(async (event) => {

  const api: Client = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Production,
  });

  const body: BatchRetrieveCatalogObjectsRequest = {
    objectIds: base.flatMap(item => item.subcategories.map(sub => sub.id))
  };

  const photoBody: BatchRetrieveCatalogObjectsRequest = {
    objectIds: [],
  };

  await api.catalogApi.batchRetrieveCatalogObjects(body).then((res) => {
      res.result.objects?.forEach((category) => {
        var categoryData = category.categoryData;
        if(categoryData == null || categoryData == undefined) return;
        var imgIds : string[] | null | undefined = categoryData?.imageIds;
        if (imgIds !== null && imgIds !== undefined) {
          photoMap.set(category.id, imgIds);
          photoBody.objectIds.push.apply(photoBody.objectIds, imgIds);
        }
      });
  })
  .then((res) => api.catalogApi.batchRetrieveCatalogObjects(photoBody))
  .then((res) => {
      res.result.objects?.forEach((pic) => {
        var value =
          typeof pic.imageData?.url === undefined
            ? null
            : (pic.imageData?.url as string);
        photoUrlMap.set(pic.id, value);});
    });

  const output = base.map(res => {
    const sc : SuperCategory = {
      name: res.title,
      description: res.desc,
      subcategories: res.subcategories.map(s => {
        let img = photoMap.get(s.id);
        let imgUrl: string | null = img ? photoUrlMap.get(img[0]) ?? null : null;
        const subc: Category = {
          id: s.id,
          name: s.title,
          color: s.color,
          description: s.desc,
          imagePath: imgUrl,
          items: []
        };
        return subc;
      }),
      show: false
    };
    return sc;
  })
  return superjson.stringify(output) as unknown as typeof output;
});