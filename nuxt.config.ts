// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/icon"],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      BACKEND_URL: 'http://localhost:8080/api'
    }
  },
  plugins: ['~/plugins/global.client.ts']
})