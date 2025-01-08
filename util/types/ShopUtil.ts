import { ApiResponse, CatalogItem, CatalogItemVariation, CatalogObject, Money, SearchCatalogItemsResponse } from "square";

export interface SuperCategory{
    name: string,
    description: string,
    show: boolean,
    subcategories: Category[]
}

export interface Category{
    id: string,
    name: string,
    color: string,
    description: string,
    imagePath: string,
    items: Item[]
}

export interface Item{
    id: string,
    categoryId: string,
    name: string,
    description: string,
    images? : ItemPhoto[],
    variations? : ItemVariation[]
}

export interface ItemVariation{
    variationId: string,
    variationName: string,
    price: number,
    currency: string
}

export interface ItemPhoto{
    id : string,
    url? : string
}

export class ShopUtil{
    static makeItemPhoto(id: string, url: string): ItemPhoto {
      let output : ItemPhoto = {
          id: id,
          url: url
      }
      return output;
    }
    public static makeCategory(cat : any) : Category {
        let output : Category = {
            id: cat.id,
            name: cat.title,
            color: cat.color,
            description: cat.desc,
            imagePath: cat.picture,
            items: []
        }
        return output;
    }
    public static makeItem(catObj: any) : Item{
        let item : any = catObj.itemData;
        let output : Item = {
            id: catObj.id,
            categoryId: item.categoryId,
            name: catObj.itemData.name,
            description: item.description,
        };
        return output;
    }

    public static makeVariation(variation : any) : ItemVariation{
        let output : ItemVariation = {
            variationId: variation.id,
            variationName: variation.itemVariationData.name,
            price: Number(variation.itemVariationData.priceMoney.amount) / 100.00,
            currency: variation.itemVariationData.priceMoney.currency
        };
        return output;
    }

    public static makeSuperCategory(supCat : any) : SuperCategory{
        let output : SuperCategory = {
              name: supCat.title,
              description: supCat.desc,
              subcategories: supCat.subcategories.map((s: { id: any; title: any; color: any; desc: any; picture: any; }) => {
                var subc : Category = {
                  id: s.id,
                  name: s.title,
                  color: s.color,
                  description: s.desc,
                  imagePath: s.picture,
                  items: []
                }
                return subc;
              })
            }
            return output;
    }
}

export default ShopUtil;

