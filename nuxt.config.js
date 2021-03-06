import colors from 'vuetify/es5/util/colors'
import i18n from './nuxt-i18n.config'

export default {
  target: 'static',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      prefix: 'og: https://ogp.me/ns#',
    },
    titleTemplate: '%s',
    title: 'ogp-generator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' },
      { rel: 'apple-touch-icon', sizes: '192x192', href: '/icon.png' },
      { rel: 'alternate', hreflang: 'en', href: 'https://ogp.mktia.com/en/' },
      { rel: 'alternate', hreflang: 'ja', href: 'https://ogp.mktia.com' },
      {
        rel: 'alternate',
        hreflang: 'x-default',
        href: 'https://ogp.mktia.com/en/',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    ['nuxt-i18n', i18n],
    ['@nuxtjs/google-adsense', { id: process.env.ADSENSE_ID }],
    ['@nuxtjs/google-gtag', { id: process.env.GTAG_ID, debug: true }],
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: {
        family: '',
      },
    },
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  generate: {
    dir: 'public',
  },
}
