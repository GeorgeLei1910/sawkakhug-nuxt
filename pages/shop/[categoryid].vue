<style>
  @import url("../../assets/css/product-card.component.css");
</style>

<script setup lang="ts">

import { Category } from "util/types/ShopUtil";
import ProductCard from "../../components/product-card.vue";
import superjson from 'superjson';

const route = useRoute();
const categoryId = route.params.categoryid as string;
const {data} = await useFetch<Category>(`/api/category/${categoryId}`, {
    transform: (value) => {
      return superjson.parse(value as unknown as string)
    }
  });

</script>

<template>
  <Cart />
  <div id="shop-layout" v-if="data != null" v-for="item in data.items">
    <ProductCard
      :category = data
      :item = item
    ></ProductCard>
  </div>
  </template>
