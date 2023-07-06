<script setup>
   defineProps(['category'])
</script>

<style scoped>
   @import url("../assets/css/category-card.component.css");
</style>

<template>
  <NuxtLink :to="shop/category.id">
    <div class="subcategory" :style="{backgroundColor: '#' + category.color}">
      <div class="imgbox"><img :src="category.picture" /></div>
      <div class="textbox">
        <h3>{{ category.title }}</h3>
        <p>{{ category.desc }}</p>
      </div>
    </div></NuxtLink>
</template>
