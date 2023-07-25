<script setup lang="ts">
    import { SearchCatalogItemsRequest, ApiError, Client, CatalogObject} from 'square';
    import ProductCard from "../../components/product-card.vue";

    const route = useRoute();
    const body : SearchCatalogItemsRequest = {
        categoryIds: [`${route.params.categoryid}`]
    };

    const api : Client = new Client();
    var items : CatalogObject [] = [];

    try {
    const { result, ...httpResponse } = await api.catalogApi.searchCatalogItems(body);
        items = result.items;
    } catch (error) {
    if (error instanceof ApiError) {
        const errors = error.result;
        // const { statusCode, headers } = error;
    }
    }
</script>

<template>
<div id="shop-layout">
    <ProductCard v-for="item in items"></ProductCard>
  </div>
</template>