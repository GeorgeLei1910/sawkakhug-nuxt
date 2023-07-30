<script setup lang="ts">

import { Category, Item } from "util/types/ShopUtil";
import ProductCard from "../../components/product-card.vue";
import superjson from 'superjson';
import router from "nuxt/dist/pages/runtime/plugins/router";

const props = defineProps<{category: Category}>();
console.log(props.category)
const route = useRoute();
const categoryId = route.params.categoryid;
const { data } = await useFetch(`/api/category/${categoryId}`, {
    transform: (value) => {
      return superjson.parse(value as unknown as string)
    }
  });

</script>

<template>
  <Cart />
  <div id="shop-layout" v-if="data != null" v-for="item in data">
    <ProductCard
      :category = props.category
      :item = item
    ></ProductCard>
  </div>
  </template>
