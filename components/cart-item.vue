<script setup lang="ts">
import SuperJSON from "superjson";
import { RemoveFromCartResponse } from "util/types/ApiUtil";
import { SOrderLineItem } from "util/types/CartUtil";
import { Category, Item } from "util/types/ShopUtil";
const props = defineProps<{item: SOrderLineItem }>();

async function removeFromCart(itemId: any) {
  console.log(itemId)
  await useFetch<RemoveFromCartResponse>("/api/item/remove-from-cart", {
    method: "post",
    body: {
      itemId: itemId,
      orderId: useCookie("order")
    },    
    transform: (value) => {
      return SuperJSON.parse(value as unknown as string)
    }
  }).then(v => {
    console.log(v.data.value?.respCode);
  });
}
</script>
<style scoped>
  #submit {
    height: 50px;
  }
  image{
    display: block;
    height: 100%;
  }
</style>
<template>
<div class="cart-items" :style="{ backgroundColor: '#' + props.item.categoryColor }">
            <div class="left">
              <img :src="props.item.photo"/>
            </div>
            <div class="right">
                <h2>{{ props.item.categoryName }}</h2>
                <h4>{{ props.item.name }}</h4>
                <h4>{{ props.item.variationName }}</h4>
                <h4> {{ props.item.totalMoney }} CAD</h4>
                <button @click="removeFromCart(props.item.uid)" id="submit" class="add-cart">
                        Remove from Cart </button>
            </div>
        </div>
</template>
