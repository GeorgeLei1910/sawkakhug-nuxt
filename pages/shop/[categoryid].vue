<script setup lang="ts">
import {
  SearchCatalogItemsRequest,
  Client,
  Environment,
} from "square";
import ProductCard from "../../components/product-card.vue";

const route = useRoute();
const props = defineProps(["categoryName"]);
const body: SearchCatalogItemsRequest = {
  categoryIds: [`${route.params.categoryid}`],
};

const api: Client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production,
});

const { result, ...httpResponse } = await api.catalogApi.searchCatalogItems(body)

</script>

<template>
  <div id="shop-layout" v-if="httpResponse.statusCode == 200" v-for="item in result.items">
    <ProductCard
      :catalogObject="item"
      :title="props.categoryName"
    ></ProductCard>
  </div>
  <div v-else>

  </div>
</template>
