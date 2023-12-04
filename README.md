# @paro-paro/vite-plugin-vuetify-sass 

[![NPM version](https://img.shields.io/npm/v/@paro-paro/vite-plugin-vuetify-sass?color=a1b858)](https://www.npmjs.com/package/@paro-paro/vite-plugin-vuetify-sass)

Copy of [vite-plugin-vuetify](https://github.com/vuetifyjs/vuetify-loader/blob/master/packages/vite-plugin) 's internal `stylesPlugin` with a few tweaks. 

Meant to be used in `Nuxt` applications with `SSR` enabled. 

Check this (infamous) issue: [#290](https://github.com/vuetifyjs/vuetify-loader/issues/290)

For more detailed info, read the [vuetify documentation](https://vuetifyjs.com/en/), specially the [SASS](https://vuetifyjs.com/en/features/sass-variables) and [treeshaking](https://vuetifyjs.com/en/features/treeshaking) sections.

**Note:** This plugin does not include `auto-import - treeshaking` functionality, so you need to still leverage `vite-plugin-vuetify` for that. Just make sure that you do not pass the `styles` option to the plugin (so its internal stylesPlugin is not added to vite).

## Install

Use your favorite package manager.

```bash
pnpm add -D @paro-paro/vite-plugin-vuetify-sass
``` 

> Vite v3.1 (or above) and Vuetify v3.0.0 (or above) are required. Vite 5.x is not yet tested.

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
import vuetify from 'vite-plugin-vuetify'
import vuetifySass from '@paro-paro/vite-plugin-vuetify-sass'

export default defineConfig({
  plugins: [
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
