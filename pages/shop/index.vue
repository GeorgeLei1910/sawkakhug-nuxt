<script setup lang="ts">
import superCategory from "../../components/supercategory.vue";
import type { SuperCategory } from "~/server/utils/ShopUtil";

const { data } = await useFetch<SuperCategory[]>("/api/categories");
</script>

<template>
  <Cart />
  <div id="shop-layout">
    <superCategory
      v-for="category in data"
      :key="category.name"
      :sc="category"
    />
  </div>
</template>

