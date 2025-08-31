import { Client, Environment } from "square/legacy";
import superjson from "superjson";

  
export default defineEventHandler(async (event) => {    
    const api: Client = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Production,
    });

    var imgUrl : string[] = [];


    await api.catalogApi.listCatalog(undefined, 'IMAGE').then((res) => {
    res.result.objects?.forEach((photo) => {
        let url : string = photo.imageData?.url!;
        imgUrl?.push(url);
    })
    });

    return superjson.stringify(imgUrl) as unknown as typeof imgUrl;
});