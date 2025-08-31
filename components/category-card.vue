<script setup lang="ts">
import type { Category } from '~/util/types/ShopUtil';
    const props = defineProps<{category : Category}>();
</script>

<style scoped>
   .subcategory {
    width: 350px;
    height: auto;
    position: relative;
    margin: 10px 5px;
    border-radius: 5px;
    color: white;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    transition: all 0.1s ease-in-out;
}

.add-cart {
    min-width: 150px;
    height: 100%;
    padding: 5px 10px;
    margin: 0 10px;
    border-radius: 75px;
    font-weight: normal;
    font-size: 18px;
    background-color: #F9BA00;
    color: #694E00;
    letter-spacing: 0.5px;
    text-align: center;
    border-style: none;
    transition: all 0.1s linear;
}

.subcategory img{
    transform: scale(1.05);
    transition: all 0.1s ease-in-out;
}
.subcategory:hover img{
    transform: scale(1.25);
}

.textbox{
    width: 100%;
    height: 100%;            
    position: absolute;
    top: 0;
    left: 0;
}
.textbox p{
    margin-left: 10px;
    margin-right: 10px;
}
.imgbox img{
    width: 100%;
    filter: grayscale(1) opacity(0.5);
}

 a{
  align-items: center;
}
</style>

<template>
  <NuxtLink :to="`/shop/${props.category.id}`">
    <div class="subcategory" :style="{backgroundColor: '#' + props.category.color}">
      <div class="imgbox"><img :src= "`${props.category.imagePath}`" /></div>
      <div class="textbox">
        <h3>{{ props.category.name }}</h3>
        <p>{{ props.category.description }}</p>
      </div>
    </div>
  </NuxtLink>
</template>
