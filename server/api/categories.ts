import superjson from "superjson";
import { Category, ShopUtil, SuperCategory } from "../../util/types/ShopUtil";

const base = [
  {
    "title": "TSUMUGI",
    "desc" : "Japanese word for spinning / weaving",
    "subcategories" : [{
      "id": "53K3J566MVBHXG6P4L2YRXOT",
      "title": "Shape of Hug",
      "color": "1fb592",
      "picture": "TsumugiSOH.jpg",
      "desc": "Tsumugi also means \"to put together the thoughts and emotions"
    },
    {
      "id": "DMSJDGUTXTINPOVHNNULYQKY",
      "title": "Sorala",
      "color": "1cc6ff",
      "picture": "TsumugiSorala.jpg",
      "desc": "\"Sora\" means sky in Japanese. These are the works which was inspired by sky"
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



export default defineEventHandler(async (event) => {
  const output = base.map(v => {
    const sc : SuperCategory = {
      name: v.title,
      description: v.desc,
      subcategories: v.subcategories.map(s => {
        const subc : Category = {
          id: s.id,
          name: s.title,
          color: s.color,
          description: s.desc,
          imagePath: s.picture,
          items: []
        }
        return subc;
      }),
    };
    return sc;
  })
  return superjson.stringify(output) as unknown as typeof output;
});