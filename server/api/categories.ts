import { type Category, ShopUtil, type SuperCategory } from "../utils/ShopUtil";
import { squareClient } from "../utils/square";

const base = [
  {
    title: "TSUMUGI",
    desc: "Japanese word for spinning / weaving",
    subcategories: [
      {
        id: "53K3J566MVBHXG6P4L2YRXOT",
        title: "Shape of Hug",
        color: "1fb592",
        desc: 'Tsumugi also means "to put together the thoughts and emotions"',
      },
      {
        id: "DMSJDGUTXTINPOVHNNULYQKY",
        title: "Sorala",
        color: "1cc6ff",
        desc: '"Sora" means sky in Japanese. These are the works which were inspired by sky',
      },
      {
        id: "UJDMB2JTZJVTD4PPRJGBGEUZ",
        title: "Matou",
        color: "fca903",
        desc:
          "Matou means: \n" +
          "* to wear / to put on (clothing, a garment, or something draped around the body)\n" +
          "* to be wrapped in / to be enveloped in (literally or figuratively, e.g. “shrouded in mist” or “cloaked in mystery”)\n" +
          "* the scent coming from the person",
      },
      {
        id: "HUOA7FSTHWH6YEOWUTSVEABP",
        title: "A Shape of Prayers",
        color: "fc03a5",
        desc: "Passing the corporate prayers to others…",
      },
    ],
  },
];

export class CategoryFinder {
  public static find(id: string | null | undefined): Category | null {
    if (!id) return null;
    for (const supcat of base) {
      const found = supcat.subcategories.find((s) => s.id === id);
      if (found) return ShopUtil.makeCategory(found);
    }
    return null;
  }
}

export default defineEventHandler(async (event) => {
  const photoMap = new Map<string, string[]>();
  const photoUrlMap = new Map<string, string | null>();

  try {
    const catRes = await squareClient.catalog.batchGet({
      objectIds: base.flatMap((item) => item.subcategories.map((sub) => sub.id)),
    });

    const photoIds: string[] = [];
    catRes.objects?.forEach((category) => {
      if (category.type === "CATEGORY" && category.id) {
        const imgIds = category.categoryData?.imageIds;
        if (imgIds && imgIds.length > 0) {
          photoMap.set(category.id, imgIds);
          photoIds.push(...imgIds);
        }
      }
    });

    if (photoIds.length > 0) {
      const photoRes = await squareClient.catalog.batchGet({
        objectIds: photoIds,
      });

      photoRes.objects?.forEach((pic) => {
        if (pic.type === "IMAGE" && pic.id) {
          photoUrlMap.set(pic.id, pic.imageData?.url ?? null);
        }
      });
    }
  } catch (error) {
    console.error("Error fetching categories from Square:", error);
  }

  const output: SuperCategory[] = base.map((res) => {
    const sc: SuperCategory = {
      name: res.title,
      description: res.desc,
      subcategories: res.subcategories.map((s) => {
        const img = photoMap.get(s.id);
        const imgUrl: string | null = img ? photoUrlMap.get(img[0]) ?? null : null;
        const subc: Category = {
          id: s.id,
          name: s.title,
          color: s.color,
          description: s.desc,
          imagePath: imgUrl,
          items: [],
        };
        return subc;
      }),
      show: false,
    };
    return sc;
  });

  return output;
});