<style scoped>
  @import url("../../assets/css/product-card.component.css");

  .select h3{
	font-size: 32px;
    margin: 5px;
}
.select h6{
	font-size: 18px;
    margin: 5px;
}

#shop-layout{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>

<script setup lang="ts">
import type { Category } from "~/server/utils/ShopUtil";
import ProductCard from "../../components/product-card.vue";

const route = useRoute();
const categoryId = route.params.categoryid as string;
const { data } = await useFetch<Category>(`/api/category/${categoryId}`);
</script>

<template>
  <Cart />
  <div id="shop-layout" v-if="data != null">
    <ProductCard
      v-for="item in data.items"
      :key="item.id"
      :category="data"
      :item="item"
    />
  </div>
</template>

