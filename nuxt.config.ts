// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/icon"],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.BACKEND_URL
    }
  },
  plugins: ['~/plugins/global.client.ts']
})