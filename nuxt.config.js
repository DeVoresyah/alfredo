
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'og:title', property: 'og:title', content: 'Alfredo Shop'},
      { hid: 'og:site_name', property: 'og:site_name', content: 'Alfredo'},
      { hid: 'og:description', property: 'og:description', content: 'Beli Aja Dulu'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Muli:300,400,400i,600,700' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@static/assets/css/codebase.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/lazyload',
    '~/plugins/vuex-persist',
    '~/plugins/vue-debounce'
  ],
  router: {
    middleware: 'auth/authenticated'
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: [
      "vee-validate/dist/rules",
      "vuex-persist"
    ],
    extend (config, ctx) {
    }
  },
  env: {
    npm_package_name: process.env.npm_package_name
  }
}
