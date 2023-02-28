// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ["~/assets/fonts/gellix/style.css"],
  modules: ["@bg-dev/nuxt-naiveui", "@nuxtjs/tailwindcss"],
  tailwindcss: {
    viewer: false,
  },

  // Fix TypeError exception on production
  // https://github.com/vitejs/vite/issues/9703#issuecomment-1216662109
  vite: {
    build: {
      commonjsOptions: { include: [] },
    },
    optimizeDeps: {
      disabled: false,
    },
  },
});
