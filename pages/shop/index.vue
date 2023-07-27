<style>
@import url("../../assets/css/newShopStyle.css");
</style>

<script setup>
  import { ref } from 'vue'
  import superCategory from '../../components/supercategory.vue';

  const categories = ref([
    {
      "title": "TSUKUROI",
      "desc" : "Japanese word for mending / remaking",
      "subcategories" : [
        {
          "id": "XCI473HOE6E5TEOTS3XAY2OB",
          "title": "Honwari",
          "color": "FFCB88",
          "picture": "Honwari.jpg",
          "desc": "Note: \"in\" means the flower pattern with three bands, \"&\" means the flower pattern with 7 stripes"
        },{
          "id": "YL5VDTUP7Z5WFVIN2LZDMQIQ",
          "title": "Tsunagu",
          "color": "3A34AD",
          "picture": "Tsunagu.jpg",
          "desc": "Tsunagu\" means connecting. Relationship starts with connecting with others. That is how we cultivate culture and how our lives are built, with dots of people and dots of events, dots of memories, dots of emotions... I am making this series to think of how each of us connect the \"dots\".  It never be like the following the templates, all of them are unique and “straight” in their own way so I stitched \"straight\" without using a ruler but using my hands to guide the dots. I hope these will bless you daily. Life become a bit of reminder that we are connected by the loving hand of God."
        }
      ]
    },{
      "title": "AMIMONO",
      "desc" : "Japanese word for knitting / crocheting",
      "subcategories" :[
        {
          "id": "EQUHVNBVYZGVEDBYGNZFIB65",
          "title": "Dongri",
          "color": "C4A3CF",
          "picture": "Dongri.jpg",
          "desc": "I wanted to make a hat which covers light like feathers. When I thought of the shape, only the shape which came to my mind was \"acorn\". This hat series will be called \"Dongri (acorn)\" reminiscing that God cares for feeding little creatures such as squirrels. I hope that we can share the reminder of God's kindness and provision."
        },{
          "id": "KFY32IDKZABZTH5RM4N27ZLT",
          "title": "Neck Warmers: Mamotte Ageru",
          "color": "3EB3C8",
          "picture": "MamotteAgeru.jpg",
          "desc": "Mamotte Ageru\" means I will protect you."
        },{
          "id": "DYMDL5LBYLXC46EYLPT76QZ6",
          "title": "A Shape of a Hug",
          "color": "62AB42",
          "picture": "ShapeOfHug.jpg",
          "desc": "I have been thinking of how to make a hug for a long time. How can I send a hug to the friends how are far a way. This is what came out from those thought."
        },{
          "id": "VT5AIBIOKYE4X2L6UHZDOGMB",
          "title": "Hand Mitts: Te O Tsunago",
          "color": "B04D30",
          "picture": "TeOTsunago.jpg",
          "desc": "Te o tsunago means let's hold hand. I like fingerless mitts because you can hold things better."
        }
      ]
    },{
      "title": "TSUMUGI",
      "desc" : "Japanese word for spinning / weaving",
      "subcategories" : [{
        "id": "53K3J566MVBHXG6P4L2YRXOT",
        "title": "Shape of Hug",
        "color": "1fb592",
        "picture": "TsumugiSOH.jpg",
        "desc": "Tsumugi also means \"to put together the thoughts and emotions"
      }]
    }
])
</script>

<template>
  <Cart />
  <div id="shop-layout">
    <superCategory v-for="category in categories" 
    :title = category.title 
    :desc = category.desc 
    :subcategories = category.subcategories>
    </superCategory>
  </div>
</template>
