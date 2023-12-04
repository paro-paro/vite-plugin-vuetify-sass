# @paro-paro/vite-plugin-vuetify-sass 

[![NPM version](https://img.shields.io/npm/v/@paro-paro/vite-plugin-vuetify-sass?color=a1b858)](https://www.npmjs.com/package/@paro-paro/vite-plugin-vuetify-sass)

Copy of [vite-plugin-vuetify](https://github.com/vuetifyjs/vuetify-loader/blob/master/packages/vite-plugin) 's internal style plugin with a few tweaks. 

Meant to be used in `Nuxt` applications with `SSR` enabled.

For more detailed info, read the [vuetify documentation](https://vuetifyjs.com/en/), specially the [SASS](https://vuetifyjs.com/en/features/sass-variables) and [treeshaking](https://vuetifyjs.com/en/features/treeshaking) sections. Also, check this (in)famous [issue.](https://github.com/vuetifyjs/vuetify-loader/issues/290)

> This plugin does not include auto-import / treeshaking functionality, so you still need to leverage the `vite-plugin-vuetify` for that. Just make sure you do not pass the `styles` option when using it.

## Install

Use your favorite package manager.

```bash
pnpm add -D @paro-paro/vite-plugin-vuetify-sass
``` 

> Vite v3.1 (or above) and Vuetify v3.0.0 (or above) are required.

## Usage

`settings.scss`

```scss
@use 'vuetify/settings' with (
  $reset: false,
  $utilities: false,
  $button-height: 100px,
  $button-border-radius: 50px
);
```

### Vue
`vite.config.ts`

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import vuetifySass from '@paro-paro/vite-plugin-vuetify-sass'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }), // do not pass the 'styles' option
    vuetifySass({ configFile: 'src/assets/settings.scss' }),
  ],
})
```

### Nuxt

`nuxt.config.ts`

```ts
import vuetify from 'vite-plugin-vuetify'
import vuetifySass from '@paro-paro/vite-plugin-vuetify-sass'

export default defineNuxtConfig({
  ssr: true,
  build: {
    transpile: ['vuetify'], // when ssr is enabled
  },
  experimental: {
    inlineSSRStyles: false, // for production build
  },
  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins!.push(
        vuetify({ autoImport: true }), // do not pass the 'styles' option
        vuetifySass({
          configFile: 'assets/settings.scss',
        }),
      )
    },
  },
})
```

> SASS compilation is currently slow (even with vite) so the performance hit (dev) is noticeable.

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Antonio Parody](https://github.com/paro-paro)
