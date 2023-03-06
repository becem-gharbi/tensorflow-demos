// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  css: ["~/assets/fonts/gellix/style.css"],

  modules: [
    "@bg-dev/nuxt-naiveui",
    "@nuxtjs/tailwindcss",
    "@kevinmarrec/nuxt-pwa",
  ],

  tailwindcss: {
    viewer: false,
  },

  pwa: {
    manifest: {
      name: "TensorFlow demos",
      short_name: "TensorFlow",
      description: "TensorFlow JS demo app",
      theme_color: "#171717",
    },
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
