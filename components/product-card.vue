<style scoped>
@import url("../assets/css/productStyle.css");

img {
  z-index: 10;
}

select {
    height: 50px;
    width: 290px;
    text-align: center;
    font-size: 100%;
    border-radius: 18px;
}

</style>

<script setup lang="ts">
import { Category, Item } from "util/types/ShopUtil";
const props = defineProps<{ category: Category; item: Item }>();

const options = ref(props.item.variations);

var slect : any = props.item.variations;
if (slect != undefined){
  slect = slect[0].variationId;
}else{
  slect = "";
}
const selected = ref(slect);

async function addToCart(itemId: any) {
  console.log(itemId)
  const { data: responseData } = await useFetch("api/item/add-to-cart.ts", {
    method: "post",
    body: {
      itemId: itemId,
      cartId: useCookie("cart"),
    },
  });
}
</script>

<template>
  <div class="product" :style="{ backgroundColor: '#' + category.color }">
    <h6 class="title">{{ props.category.name }}</h6>
    <h4 class="prodname">{{ props.item.name }}</h4>
    <ProductGallery :item="props.item" />
    <p class="description">{{ props.item.description }}</p>
    <table>
      <tbody>
        <tr>
          <td><select name="item" id="color" v-model="selected">
            <option v-for="vary in options" :value=vary.variationId> {{ vary.variationName }} ({{ vary.price }} {{ vary.currency }})</option>
          </select></td>
        </tr>
      </tbody>
    </table>
    <p class="size"></p>
    <button @click="addToCart(selected)" id="submit" class="add-cart">
      Add to Cart
    </button>
  </div>
</template>
