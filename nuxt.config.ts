// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [
    '~/assets/vendors/mdi/css/materialdesignicons.min.css',
    '~/assets/vendors/css/vendor.bundle.base.css',
    '~/assets/css/style.css',
    
  ],
  modules: [
    // ...
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore',
        ],
      },
    ],
  ],
});