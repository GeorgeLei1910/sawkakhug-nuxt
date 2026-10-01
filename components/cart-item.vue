<script scoped setup lang="ts">
import type { RemoveFromCartResponse } from "~/server/utils/ApiUtil";
import type { SOrderLineItem } from "~/server/utils/CartUtil";

const props = defineProps<{ item: SOrderLineItem }>();
const emit = defineEmits<{ (e: "removed", uid: string): void }>();

const isRemoving = ref(false);
const orderCookie = useCookie("order", {
  maxAge: 3600 * 24 * 7,
});

async function removeFromCart(lineItemUid: string) {
  if (isRemoving.value) return;
  isRemoving.value = true;

  try {
    const res = await $fetch<RemoveFromCartResponse>("/api/item/remove-from-cart", {
      method: "DELETE",
      body: {
        itemId: lineItemUid,
        orderId: orderCookie.value,
      },
    });

    if (res.respCode === 200) {
      emit("removed", lineItemUid);
    }
  } catch (err) {
    console.error("Failed to remove item from cart:", err);
  } finally {
    isRemoving.value = false;
  }
}

const itemColor = computed(() => {
  if (!props.item.categoryColor) return "#444";
  return props.item.categoryColor.startsWith("#")
    ? props.item.categoryColor
    : `#${props.item.categoryColor}`;
});
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
<div class="cart-items" :style="{ backgroundColor: itemColor }">
            <div class="left">
              <img :src="props.item.photo"/>
            </div>
            <div class="right">
                <h2>{{ props.item.categoryName }}</h2>
                <h4>{{ props.item.name }}</h4>
                <h4>{{ props.item.variationName }}</h4>
                <h4> {{ props.item.totalMoney }} CAD</h4>
                <button
                  @click="removeFromCart(props.item.uid)"
                  id="submit"
                  class="add-cart"
                  :disabled="isRemoving"
                >
                  {{ isRemoving ? "Removing..." : "Remove from Cart" }}
                </button>
            </div>
        </div>

</template>
