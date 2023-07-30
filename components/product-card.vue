<script setup lang="ts">
    import { Category, Item } from 'util/types/ShopUtil';
    const props = defineProps<{category: Category, item: Item}>();
</script>

<template>
  <div class="product" :style="{backgroundColor: '#666666'}">
    <h6 class="title"></h6>
    <h4 class="prodname">{{props.item.name}}</h4>
    <p class="description">{{props.item.description}}</p>
    <h5 class="price">CAD</h5>
    <p class="size"></p>
    <button onclick="addToCart(props.id)" id="submit" class="add-cart">
      Add to Cart
    </button>
  </div>
</template>
