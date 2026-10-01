// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-30',
  modules: ['nuxt-swiper'],
  devtools: { enabled: true },
  debug: true,
  pages: true,
  runtimeConfig: {
    squareAccessToken: process.env.SQUARE_ACCESS_TOKEN || '',
    squareLocationId: process.env.SQUARE_LOCATION_ID || 'L8JKG4FT7AG9V',
    squareEnvironment: process.env.SQUARE_ENVIRONMENT || 'production',
  }
})


