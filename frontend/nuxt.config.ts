export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
    },
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      meta: [
        { name: 'color-scheme', content: 'dark' }
      ]
    }
  }
})