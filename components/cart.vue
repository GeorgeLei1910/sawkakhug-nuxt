<style scoped>
.select{
    width: 100%;
    height: 20px;
	display: inline-block;
	margin: 10px 2.5px;
	border: 5px solid rgb(177, 133, 0);
	border-radius: 10px;
	background-color: rgb(255, 219, 112);
	color:  rgb(177, 133, 0);
}

.container #info-bar {
    width: 100%;
    background-color: #c5c5c5;
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 1;
}

#info-bar form{
    width: 33%;
    height: auto;
    display: flex;
    justify-content: center;
    padding: 5px 0;
    position: sticky;
    top: 0;
    z-index: 8;
}


#info-bar form select{ 
    width: 100%;
    margin: auto;
    top: 0;
    z-index: 8;
}

#info-bar .price{
    margin: 20px 0;
    padding: 0 20px; 
}


.add-cart {
    min-width: 150px;
    height: 50px;
    padding: 5px 10px;
    margin: 0 10px;
    border-radius: 75px;
    font-weight: normal;
    font-size: 18px;
    background-color: #F9BA00;
    color: #694E00;
    letter-spacing: 0.5px;
    text-align: center;
    border-style: none;
    transition: all 0.1s linear;
}

#info-bar .total{
    height: 100%;
    margin: auto;
}

h5{
    font-size: 20px;
    margin: 0;
}



</style>
<script setup lang="ts">
    const paylink = useCookie("url");
    const url = paylink.value || "";
    const route = useRoute();
    const props = defineProps(["total"]);
    console.log(route)
</script>
<template>
    <div id="info-bar">
        <NuxtLink v-if="$route.path !== '/shop/cart'" to="/shop/cart"><button class="add-cart">View Shopping Cart</button></NuxtLink>
        <a v-if="$route.path == '/shop/cart'" :href="url" target="_blank"><button class="add-cart">Checkout</button></a>
        <div class="total" v-if="props.total"><h5>Total: {{ props.total }} CAD</h5></div>
        <NuxtLink v-if="$route.path !== '/shop'" to="/shop"><button v class="add-cart" name="view-cart" value="1">Back</button></NuxtLink>
    </div>
</template>
