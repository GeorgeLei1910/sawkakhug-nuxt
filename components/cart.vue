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
<template>
    <div id="info-bar">
        <button class="add-cart">Checkout</button>
        <button v-if="$route.name === 'shop'" class="add-cart" name="view-cart" value="1">View Shopping Cart</button>
        <button v-else class="add-cart" name="view-cart" value="1"></button>
    </div>
</template>
