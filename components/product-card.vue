<style scoped>
  @import url("../assets/css/productStyle.css");

  img {
    z-index: 10;
  }
</style>

<script setup lang="ts">
    import { Category, Item } from 'util/types/ShopUtil';
    const props = defineProps<{category: Category, item: Item}>();

    async function addToCart(itemId: any) {
      const { data: responseData } = await useFetch('http://localhost:8888/tutorial-form-handler/index.php', {
        method: 'post',
        body: { 
          itemId: itemId,
          cartId: useCookie('cart'),
        }
      });
    }
</script>

<template>
  <div class="product" :style="{backgroundColor: '#' + category.color}">
    <h6 class="title">{{props.category.name}}</h6>
    <h4 class="prodname">{{props.item.name}}</h4>
    <ProductGallery :item="props.item"/>
    <p class="description">{{props.item.description}}</p>
    <h5 class="price">  CAD</h5>
    <p class="size"></p>
    <button @click="addToCart(props.item.id)" id="submit" class="add-cart">
      Add to Cart
    </button>
  </div>
</template>
