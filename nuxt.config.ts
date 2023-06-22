// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/styles/main.scss"],
  modules: ["@nuxtjs/tailwindcss", "dayjs-nuxt"],
  dayjs: {
    plugins: ["relativeTime"],
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Bloggy",
    },
  },
  transpile: ["vue-toastification"],
});
