<script setup lang="ts">
import type { SuperCategory } from "~/util/types/ShopUtil";
import categoryCard from "../components/category-card.vue";
const props = defineProps<{ sc: SuperCategory }>();
</script>

<style scoped>
.select h3 {
  font-size: 32px;
  margin: 5px;
}
.select h6 {
  font-size: 18px;
  margin: 5px;
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

.categories{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
}
</style>

<template>
  <button class="select" type="submit">
    <h3>{{ props.sc.name }}</h3>
    <h6>{{ props.sc.description }}</h6>
    <h6></h6>
  </button>
  <div class="categories">
    <categoryCard
    v-for="category in props.sc.subcategories"
    :category="category"
  ></categoryCard>
  </div>
</template>
