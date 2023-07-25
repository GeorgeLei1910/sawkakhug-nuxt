<script setup>
   defineProps(['category'])
</script>

<style scoped>
   @import url("../assets/css/category.component.css");
</style>

<template>
    <div class="subcategory" :style="{backgroundColor: '#' + category.color}">
      <div class="imgbox"><img :src= "`images/Products/${category.picture}`" /></div>
      <div class="textbox">
        <h3>{{ category.title }}</h3>
        <p>{{ category.desc }}</p>
      </div>
    </div>
</template>
