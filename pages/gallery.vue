<style scoped>
@import url("../assets/css/galleryStyle.css");
.gallery_container{
	width: 100%;
	display: flex;
	flex: auto;
	clear: both;
	flex-flow: row wrap;
	justify-content: space-around;
}
.gallery_pictures{
	width: 16%;
	min-width: 300px;
}

.gallery_pictures img{
	width: 100%;
	padding: 10px 0;
}

</style>

<script setup lang="ts">
const { data } = await useFetch<string[]>("/api/gallery");
</script>

<template>
  <div class="gallery_container">
    <div class="gallery_pictures" v-for="picture in data" :key="picture">
      <img :src="picture" />
    </div>
  </div>
</template>

