<script setup lang="ts">
    import { CatalogObject } from 'square';

    const props = defineProps({
        item: CatalogObject
    })

</script>

<template>
  <div class="product" style="background-color: #777777">
    <h6 class="title"></h6>
    <h4 class="prodname"></h4>
    <p class="description"></p>
    <h5 class="price">CAD</h5>
    <p class="size"></p>
    <button onclick="addToCart()" id="submit" class="add-cart">
      Add to Cart
    </button>
  </div>
</template>
