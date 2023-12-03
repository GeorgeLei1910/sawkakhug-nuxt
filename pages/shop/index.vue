<script setup lang="ts">
  import superCategory from '../../components/supercategory.vue';
  import superjson from 'superjson';
  const { data } = await useFetch('/api/categories', {
    transform: (value) => {
      return superjson.parse(value as unknown as string)
    }
  });
</script>

<template>
  <Cart />
  <div id="shop-layout">
    <superCategory v-for="category in data" 
    :sc="category">
    </superCategory>
  </div>
</template>
