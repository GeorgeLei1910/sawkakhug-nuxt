<script setup lang="ts">
  import { SuperCategory } from 'util/types/ShopUtil';
  import categoryCard from '../components/category-card.vue';
  const props = defineProps<{sc : SuperCategory}>();
</script>

<template>
  <button class="select" type="submit">
    <h3>{{ props.sc.name }}</h3>
    <h6>{{ props.sc.description }}</h6>
    <h6></h6>
  </button>
  <categoryCard
      v-for="category in props.sc.subcategories"
      :category="category"
    ></categoryCard>
</template>
