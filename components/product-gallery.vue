<style scoped>
  @import url("../node_modules/swiper/swiper.css");
  @import url("../node_modules/swiper/modules/navigation.css");
</style>

<script setup lang="ts">
  import { Item } from 'util/types/ShopUtil';

  const props = defineProps<{item : Item}>();
</script>

<template>
  <Swiper :modules="[SwiperNavigation]" :navigation="true" :loop="true" class="mySwiper" >
    <SwiperSlide v-for="image in props.item.images"> <img :src="image.url"/></SwiperSlide>
  </Swiper>
</template>
