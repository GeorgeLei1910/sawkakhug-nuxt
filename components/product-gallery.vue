<!-- <script setup lang="ts">
import { Item } from 'util/types/ShopUtil';
    const props = defineProps<{item : Item}>();
    var display = "block";

    var map1 = new Map();

    var allSlideshows = document.querySelectorAll(".slideshow-container");

    for(var i = 0; i < allSlideshows.length; i++){
        var slint = "s" + i;
        map1.set(slint, 1);
        showSlides(1, slint);
    }

    function plusSlides(n, no) {
      map1.set(no, n + map1.get(no))
      showSlides(map1.get(no), no);
    }

    function showSlides(n: number, no :) {
      var i;
      var x = document.querySelectorAll("." + no + " .slides");
      if (n > x.length) {map1.set(no, 1)}    
      if (n < 1) {map1.set(no, x.length)}
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
      }
      x[map1.get(no)-1].style.display = "block";  
    }

</script>

<template>
  <div :class="`slideshow-container s${props.item.id}`">
    <div class="slides" :style={ display: { display }}>
      <img src=" $image_map[$image] "/>
    </div>
    <a class="prev" :on-click=plusSlides(-1, "s" + props.item.id)>&#10094;</a>
    <a class="next" onclick="plusSlides(1, 's$sid')">&#10095;</a>
  </div>
</template> -->
