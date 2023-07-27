<script setup lang="ts">
    import { CatalogObject } from 'square';
    const props = defineProps<{catalogObject: CatalogObject; title: string}>();
</script>

<template>
  <div class="product" style="background-color: #777777">
    <h6 class="title">{{title}}</h6>
    <h4 class="prodname">{{props.catalogObject.itemData?.name}}</h4>
    <p class="description">{{props.catalogObject.itemData?.description}}</p>
    <h5 class="price">CAD</h5>
    <p class="size"></p>
    <button onclick="addToCart(props.id)" id="submit" class="add-cart">
      Add to Cart
    </button>
  </div>
</template>
