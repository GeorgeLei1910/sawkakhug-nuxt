<style>

</style>

<script setup lang="ts">
import { SOrderLineItem } from "util/types/CartUtil";
import { Category, Item } from "util/types/ShopUtil";
const props = defineProps<{item: SOrderLineItem }>();

async function removeFromCart(itemId: any) {
  console.log(itemId)
  const { data: responseData } = await useFetch("api/item/remove-from-cart", {
    method: "post",
    body: {
      itemId: itemId,
      cartId: useCookie("cart")
    },
  });
}
</script>

<template>
<div class="cart-items" :style="{ backgroundColor: '#' + props.item.categoryColor }">
            <div class="left">
            <image src="$this->image"/>
            </div>
            <div class="right">
                <h2>{{ props.item.categoryName }}</h2>
                <h4>{{ props.item.name }}</h4>
                <h4> {{ props.item.totalMoney }} CAD</h4>
                <button @click="removeFromCart(props.item.uid)" id="submit" class="add-cart">
                        Remove from Cart </button>
            </div>
        </div>
</template>
