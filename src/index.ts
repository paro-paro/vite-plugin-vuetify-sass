import { plugin } from './plugin'
import { LOGGER_PREFIX } from './constants'
import type { Plugin, PluginOptions } from './types'

export default function vitePlugin(options: PluginOptions): Plugin {
  if (!options.configFile)
    throw new Error(`${LOGGER_PREFIX}: configFile option is required.`)

  return plugin(options)
}
