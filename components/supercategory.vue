<script setup>
  import categoryCard from '../components/category-card.vue';
  const props = defineProps({
    'title' : String, 
    'desc' : String, 
    'subcategories' : String
  });
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
