// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ["~/assets/fonts/gellix/style.css"],
  modules: ["@bg-dev/nuxt-naiveui", "@nuxtjs/tailwindcss"],
  tailwindcss: {
    viewer: false,
  },
});
