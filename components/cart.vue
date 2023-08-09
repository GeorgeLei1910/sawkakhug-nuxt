<style>
      .cart-items{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 100%;
            border-radius: 20px;
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
</style>
<script setup lang="ts">
    const paylink = useCookie("url");
    const url = paylink.value || "";
    const route = useRoute();
    console.log(route)
</script>
<template>
    <div id="info-bar">
        <NuxtLink v-if="$route.path !== '/shop/cart'" to="/shop/cart"><button class="add-cart">View Shopping Cart</button></NuxtLink>
        <a v-if="$route.path == '/shop/cart'" :href="url" target="_blank"><button class="add-cart">Checkout</button></a>
        <NuxtLink v-if="$route.path !== '/shop'" to="/shop"><button v class="add-cart" name="view-cart" value="1">Back</button></NuxtLink>
    </div>
</template>
