<script setup lang="ts">

import ProductCard from "../../components/product-card.vue";

const route = useRoute();
const props = defineProps(["categoryId"]);

console.log(await useFetch(`/api/category/${props.categoryId}`));

</script>

<template>
  <!-- <div id="shop-layout" v-for="item in result.items">
    <ProductCard
      :catalogObject="item"
      :title="props.categoryName"
    ></ProductCard>
  </div> -->
  </template>
