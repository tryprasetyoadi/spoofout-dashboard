// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'update-data',
        path: '/update/:id',
        component: resolve(__dirname, 'clients/update.vue')
      });
    }
  },
  setup() {
    const router = useRouter();

    // Function to navigate back to /clients
    const backToClients = () => {
      router.push('/clients'); // Use router.push to navigate to the /clients route
    };

    return {
      backToClients,
    };
  },
  runtimeConfig: {
    public: {
      baseUrl: "https://lsp-micro-spoofout-dashboard-api.btqclk.easypanel.host/api/",
      appSecret: ""
    }
  },
  ssr: false,
  css: [
    '~/assets/vendors/mdi/css/materialdesignicons.min.css',
    '~/assets/vendors/css/vendor.bundle.base.css',
    '~/assets/css/style.css',
    
  ],
  modules: [
    
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
  vite: {
    // @ts-ignore
    ssr: {noExternal: ["moment"]}
  }
});

