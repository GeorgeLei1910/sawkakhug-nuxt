import { SquareClient, Square, SquareEnvironment } from "square";
import superjson from "superjson";

  
export default defineEventHandler(async (event) => {    
    const api: SquareClient = new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN,
    environment: SquareEnvironment.Production,
    });

    var imgUrl : string[] = [];

    await api.catalog.search({ objectTypes: [Square.CatalogObjectType.Image] }).then((res) => {
    res.objects?.forEach((obj) => {
        let photo = obj as Square.CatalogObjectImage;
        let url : string = photo.imageData?.url!;
        imgUrl?.push(url);
    })
    });

    return superjson.stringify(imgUrl) as unknown as typeof imgUrl;
});