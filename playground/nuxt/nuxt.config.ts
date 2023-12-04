import vuetify from 'vite-plugin-vuetify'
import vuetifySass from '@paro-paro/vite-plugin-vuetify-sass'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  builder: 'vite',
  telemetry: false,

  css: ['vuetify/styles'],

  build: {
    transpile: ['vuetify'],
  },

  experimental: {
    inlineSSRStyles: false,
  },

  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins!.push(
        vuetify(),
        vuetifySass({
          configFile: 'assets/settings.scss',
        }),
      )
    },
  },

  devtools: {
    enabled: true,
  },
})
