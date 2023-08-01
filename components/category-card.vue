<script setup lang="ts">
import { Category } from 'util/types/ShopUtil';
    const props = defineProps<{category : Category}>();
</script>

<style scoped>
   @import url("../assets/css/category.component.css");
</style>

<template>
  <NuxtLink :to="`/shop/${props.category.id}`">
    <div class="subcategory" :style="{backgroundColor: '#' + props.category.color}">
      <div class="imgbox"><img :src= "`images/Products/${props.category.imagePath}`" /></div>
      <div class="textbox">
        <h3>{{ props.category.name }}</h3>
        <p>{{ props.category.description }}</p>
      </div>
    </div>
  </NuxtLink>
</template>
