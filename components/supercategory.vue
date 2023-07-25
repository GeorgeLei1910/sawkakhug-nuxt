<script setup>
  defineProps('title', 'desc', 'subcategories');
  import categoryCard from '../components/category-card.vue';
</script>

<template>
  <button class="select" type="submit">
    <h3>{{ title }}</h3>
    <h6>{{ desc }}</h6>
    <h6></h6>
  </button>
  <categoryCard
      v-for="category in subcategories"
      :category="category"
    ></categoryCard>
</template>
