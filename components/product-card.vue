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


.add-cart{
  color: v-bind(buttonTextColor);
  background-color: v-bind(buttonColor);
  min-width: 150px;
  height: 100%;
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

.select{
    width: 100%;
	display: inline-block;
	margin: 10px 2.5px;
	border: 5px solid rgb(177, 133, 0);
	border-radius: 10px;
	background-color: rgb(255, 219, 112);
	color:  rgb(177, 133, 0);
}

</style>

<script scoped setup lang="ts">
import type { Category, Item } from "~/server/utils/ShopUtil";
import type { AddToCartResponse } from "~/server/utils/ApiUtil";

const props = defineProps<{ category: Category; item: Item }>();

const options = ref(props.item.variations);
const defaultVariationId = props.item.variations?.[0]?.variationId ?? "";
const selected = ref(defaultVariationId);

type ButtonStatus = "idle" | "loading" | "success" | "error";
const buttonStatus = ref<ButtonStatus>("idle");
const errorMessage = ref("");
let resetTimer: ReturnType<typeof setTimeout> | null = null;

const buttonText = computed(() => {
  if (buttonStatus.value === "loading") return "Adding...";
  if (buttonStatus.value === "success") return "Added To Cart";
  if (buttonStatus.value === "error") return errorMessage.value || "Error";
  return "Add To Cart";
});

const buttonColor = computed(() => {
  if (buttonStatus.value === "loading") return "#e0a800";
  if (buttonStatus.value === "success") return "#398f47";
  if (buttonStatus.value === "error") return "#ff6b6b";
  return "#F9BA00";
});

const buttonTextColor = computed(() => {
  if (buttonStatus.value === "success" || buttonStatus.value === "error") return "#FFFFFF";
  return "#694E00";
});

const currOrderId = useCookie("order", { maxAge: 3600 * 24 * 3 });
const paylink = useCookie("paylink", { maxAge: 3600 * 24 * 3 });
const url = useCookie("url", { maxAge: 3600 * 24 * 3 });

function setStatusWithReset(status: ButtonStatus, message = "") {
  if (resetTimer) clearTimeout(resetTimer);
  buttonStatus.value = status;
  errorMessage.value = message;
  resetTimer = setTimeout(() => {
    buttonStatus.value = "idle";
    errorMessage.value = "";
  }, 2000);
}

async function addToCart(itemId: string) {
  if (!itemId || buttonStatus.value === "loading") return;

  buttonStatus.value = "loading";

  try {
    const res = await $fetch<AddToCartResponse>("/api/item/add-to-cart", {
      method: "PUT",
      body: {
        itemId,
        orderId: currOrderId.value,
      },
    });

    if (res.respCode === 200 && res.res) {
      if (res.res.order?.id) currOrderId.value = res.res.order.id;
      if (!paylink.value && res.res.paymentLink) paylink.value = res.res.paymentLink;
      if (!url.value && res.res.url) url.value = res.res.url;
      setStatusWithReset("success");
    } else {
      const err = res.error?.[0] || "Failed to add";
      setStatusWithReset("error", err);
    }
  } catch (err: any) {
    const message = err?.data?.error?.[0] || err?.data?.statusMessage || "Error adding item";
    setStatusWithReset("error", message);
  }
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
          <td>
            <select name="item" id="color" v-model="selected">
              <option v-for="vary in options" :key="vary.variationId" :value="vary.variationId">
                {{ vary.variationName }} ({{ vary.price }} {{ vary.currency }})
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="size"></p>
    <button
      @click="addToCart(selected)"
      id="submit"
      class="add-cart"
      :disabled="buttonStatus === 'loading'"
      :style="{ backgroundColor: buttonColor, color: buttonTextColor }"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

