import { ApiResponse, CatalogItem, CatalogItemVariation, CatalogObject, Money, SearchCatalogItemsResponse } from "square";

export interface SuperCategory{
    name: string,
    description: string,
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
    price: Money,
}

export class ItemPhoto{
    id : string; 
    url : string;
    constructor(id : string, url: string){
        this.id = id;
        this.url = url;
    }
}

export class ShopUtil{
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
            variationId: variation.itemId,
            variationName: variation.name,
            price: variation.priceMoney
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

