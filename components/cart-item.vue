<script scoped setup lang="ts">
import SuperJSON from "superjson";
import type { RemoveFromCartResponse } from "~/util/types/ApiUtil";
import type { SOrderLineItem } from "~/util/types/CartUtil";

const props = defineProps<{item: SOrderLineItem }>();


async function removeFromCart(itemId: any) {
  console.log(itemId)
  await useFetch<RemoveFromCartResponse>("/api/item/remove-from-cart", {
    method: "delete",
    body: {
      itemId: itemId,
      orderId: useCookie("order", {
      maxAge: 3600 * 24 * 7
    })
    },    
    transform: (value) => {
      return SuperJSON.parse(value as unknown as string)
    }
  }).then((res) => {
    console.log("Remove : " + res);
  })
  .catch((err) => console.log(err))
  .finally(() => window.location.reload());
}
</script>
<style scoped>

.cart-items{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;
      border-radius: 20px;
      padding: 10px 0;
      margin: 10px 0;
      min-width: 200px;
  }

  .cart-items .left{
      padding: 20px;
      width: fit-content;
  }

  .cart-items .left img{
      width: 200px;
      border-radius: 20px;
  }

  .cart-items .right{
      color: white;
      width: 200px;
  }

  .cart-items .right *{
      margin: 20px 10px;
  }

  #submit {
    background-color: #F9BA00;
    color: #694E00;
    min-width: 150px;
    height: 50px;
    padding: 5px 10px;
    margin: 0 10px;
    border-radius: 75px;
    font-weight: normal;
    font-size: 18px;
    letter-spacing: 0.5px;
    text-align: center;
    border-style: none;
    transition: all 0.1s linear;
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
