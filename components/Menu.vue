<style scoped>
    @import url("../assets/css/menu.component.css");
</style>
<template>
    <header>
        <div class="primary_header"><NuxtLink to="/" title="Homepage">
                <h1 class="title">SAWKAKHUG</h1>
        </NuxtLink></div>
        <nav class="secondary_header" id="menu">
            <NuxtLink to="/about" title="More About Izumi">
                <div class="menu_options">About</div>
            </NuxtLink>
            <NuxtLink to="/shop" title="Buy Goods">
                <div class="menu_options">Shop</div>
            </NuxtLink>
            <NuxtLink to="/gallery" title="Her Past Knittings">
                <div class="menu_options">Gallery</div>
            </NuxtLink>
            <a href="mailto:sawkakhugamimono@gmail.com">
                <div class="menu_options">Contact</div>
            </a>
        </nav>
    </header>
</template>