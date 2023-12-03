<script setup lang="ts">
import SuperJSON from 'superjson';
import { SCart } from 'util/types/CartUtil';

let oId = useCookie("order", {
  maxAge: 3600 * 24 * 7
});

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

<style scoped>
  h2{
    text-align: center;
  }
</style>

<template>
    <Cart :total="data?.totalPrice"/>
    <div id="shop-layout">
        <h2 v-if="!data?.items || data?.items.length < 1"> Cart empty, go add some stuff!! </h2>
        <CartItem v-else v-for="item in data?.items" :item="item"></CartItem>
    </div>
</template>