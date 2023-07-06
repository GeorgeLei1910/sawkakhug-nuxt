<style scoped>
  @import url("~/assets/css/homepagestyle.css");
  @import url("~/assets/css/homepage.component.css");
</style>

<script setup>
  useHead({
    script: [{ src: "https://cdn.lightwidget.com/widgets/lightwidget.js" }]
  });
</script>

<template> 
  <div class="home">
    <h3>Sawkakhug</h3>
    <p class="quote_text">Sawkak is a Hebrew word for knitting, weaving, spread over, put together. The image of my
      making is passing a hug of peace</p>
    <p class="quote_text">Welcome to this website! </p>
    <video width="100%" controls>
      <source src="../assets/images/video-1565147810.mp4" type="video/mp4" />
    </video>
  </div>
  <div class="home">
    <ClientOnly>
  <iframe src="https://lightwidget.com/widgets/56cbc53dee5b5bbdbd56a6501aeef396.html" scrolling="no" allowtransparency="true" class="lightwidget-widget" style="width:100%;border:0;overflow:hidden;"></iframe>
</ClientOnly>
  </div>
</template>