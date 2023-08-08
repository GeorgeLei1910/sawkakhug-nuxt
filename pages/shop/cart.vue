<script setup lang="ts">
import SuperJSON from 'superjson';
import { SCart } from 'util/types/CartUtil';

let oId = useCookie("order");

console.log('oId');
console.log(oId);

const {data} = await useFetch<SCart>("/api/item/list-cart", {
    method: 'post',
    body:{
        orderId: oId.value
    },
    transform: (value) => {
      return SuperJSON.parse(value as unknown as string)
    }
  }).then(v => {
    console.log(v);
    return v;
  });
</script>

<template>
    <Cart/>
    <div id="shop-layout">
        <CartItem v-for="item in data?.items" :item="item"></CartItem>
    </div>
</template>