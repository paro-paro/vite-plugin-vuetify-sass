import type { Plugin } from 'vite'

interface PluginOptions {
  /**
   * Absolute or relative path to the sass/scss configuration file.
   *
   * @example 'src/assets/settings.scss'
   */
  configFile: string
}

export type {
  Plugin,
  PluginOptions,
}
