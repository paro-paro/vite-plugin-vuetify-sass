import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import vuetifySass from '@paro-paro/vite-plugin-vuetify-sass'
import inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3001 },
  plugins: [
    vue(),
    vuetify(),
    vuetifySass({ configFile: 'src/assets/settings.scss' }),
    inspect(),
  ],
})
