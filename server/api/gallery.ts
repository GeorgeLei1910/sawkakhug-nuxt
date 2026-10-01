import { Square } from "square";
import { squareClient } from "../utils/square";

export default defineEventHandler(async (event) => {
    const imgUrl: string[] = [];

    const res = await squareClient.catalog.search({
        objectTypes: [Square.CatalogObjectType.Image],
    });

    res.objects?.forEach((obj) => {
        if (obj.type === "IMAGE" && obj.imageData?.url) {
            imgUrl.push(obj.imageData.url);
        }
    });

    return imgUrl;
});