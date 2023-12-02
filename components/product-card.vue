<style scoped>
@import url("../assets/css/productStyle.css");

img {
  z-index: 10;
}

select {
    height: 50px;
    width: 290px;
    text-align: center;
    font-size: 100%;
    border-radius: 18px;
}

.added {
  color: white;
  background-color: #398f47;
}



</style>

<script setup lang="ts">
import superjson from "superjson";
import { Category, Item } from "util/types/ShopUtil";
import {AddToCartResponse} from "util/types/ApiUtil"
const props = defineProps<{ category: Category; item: Item }>();

const options = ref(props.item.variations);
const buttonText = ref("Add To Cart");
const buttonColor = ref("#F9BA00");


var slect : any = props.item.variations;
if (slect != undefined){
  slect = slect[0].variationId;
}else{
  slect = "";
}
const selected = ref(slect);
let currOrderId = useCookie("order", {
  maxAge: 3600 * 24 * 3
});
let paylink = useCookie("paylink", {
  maxAge: 3600 * 24 * 3
});
let url = useCookie("url", {
  maxAge: 3600 * 24 * 3
});

function changeText(text : string, textToChangeBackTo : string) {
      var buttonId = document.getElementById("submit") as HTMLButtonElement;

    }

async function addToCart(itemId: any) {
  console.log(itemId)
  await useFetch<AddToCartResponse>("/api/item/add-to-cart", {
    method: "post",
    body: {
      itemId: itemId,
      orderId: currOrderId.value
    },
    transform: (value) => {
      return superjson.parse(value as unknown as string)
    }
  })
  .then((v) => {
    console.log(v);
    if (v === undefined) return;
    if (v.data.value?.respCode == 200){
    var result = v.data.value?.res
    if (result === undefined || result === null) return null;
    currOrderId.value = result.order?.id;
    if (!paylink.value) paylink.value = result?.paymentLink;
    if (!url.value) url.value = result?.url;
      buttonText.value = "Added To Cart";
      buttonColor.value = "#398f47";
      
      setTimeout(function() { buttonText.value = "Add To Cart"; }, 3000);
      setTimeout(function() { buttonColor.value = "#F9BA00"; }, 3000);
    }
    return v;
  });
}
</script>

<template>
  <div class="product" :style="{ backgroundColor: '#' + category.color }">
    <h6 class="title">{{ props.category.name }}</h6>
    <h4 class="prodname">{{ props.item.name }}</h4>
    <ProductGallery :item="props.item" />
    <p class="description">{{ props.item.description }}</p>
    <table>
      <tbody>
        <tr>
          <td><select name="item" id="color" v-model="selected">
            <option v-for="vary in options" :value=vary.variationId> {{ vary.variationName }} ({{ vary.price }} {{ vary.currency }})</option>
          </select></td>
        </tr>
      </tbody>
    </table>
    <p class="size"></p>
    <button  @click="addToCart(selected)" id="submit" class="add-cart" :style= "{ backgroundColor : buttonColor }" >
      {{ buttonText }}
    </button>
  </div>
  
</template>
