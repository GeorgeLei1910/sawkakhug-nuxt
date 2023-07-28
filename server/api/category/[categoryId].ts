import {
    SearchCatalogItemsRequest,
    Client,
    Environment,
  } from "square";

export default defineEventHandler(async (event) => {

    const body: SearchCatalogItemsRequest = {
    categoryIds: [`${event.context.params?.categoryId}`],
    };
    
    const api: Client = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Production,
    });

    const res = await api.catalogApi.searchCatalogItems(body);
    const json = JSON.stringify(res, (key, value) =>
    typeof value === "bigint" ? value.toString() + "n" : value
    );
    return json;
});
