<script setup lang="ts">
import type { SCart } from "~/server/utils/CartUtil";

const oId = useCookie("order", {
  maxAge: 3600 * 24 * 7,
});

const { data, refresh } = await useFetch<SCart>("/api/item/list-cart", {
  method: "POST",
  body: {
    orderId: oId.value,
  },
});
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>

<template>
  <Cart :total="data?.totalPrice" />
  <div id="shop-layout">
    <h2 v-if="!data?.items || data?.items.length < 1">Cart empty, go add some stuff!!</h2>
    <CartItem
      v-else
      v-for="item in data.items"
      :key="item.uid"
      :item="item"
      @removed="() => refresh()"
    />
  </div>
</template>
