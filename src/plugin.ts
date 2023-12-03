import { cwd } from 'node:process'
import { isAbsolute, join, normalize, relative } from 'pathe'
import type { Plugin, PluginOptions } from './types'
import { getVuetifyRootDir, isVuetifyComponentStyle, isVuetifyMainStyle } from './helpers'
import { REGEX_1, REGEX_2, VIRTUAL_VUETIFY_SASS } from './constants'

export function plugin(options: PluginOptions): Plugin {
  let configFile: string
  const vuetifyLib = join(getVuetifyRootDir(), 'lib')
  const tempFiles = new Map<string, string>()

  return {
    name: 'vuetify:sass',
    enforce: 'pre',

    /* vite */
    configResolved(resolvedConfig) {
      if (isAbsolute(options.configFile))
        configFile = options.configFile
      else
        configFile = join(resolvedConfig.root || cwd(), options.configFile)
    },

    /* rollup */
    async resolveId(source, importer, { custom, ssr }) {
      const isMainStyle = isVuetifyMainStyle(source)
      const isComponentStyle = isVuetifyComponentStyle(source, importer)

      if (isMainStyle || isComponentStyle) {
        const resolution = await this.resolve(source, importer, { skipSelf: true, custom })
        if (!resolution)
          return null

        const target = resolution.id.replace(/\.css$/, '.sass')
        const file = relative(vuetifyLib, target)
        const content = `@use "${normalize(configFile)}"\n@use "${normalize(target)}"`

        tempFiles.set(file, content)
        return ssr
          ? `/@${VIRTUAL_VUETIFY_SASS}/${file}`
          : `/@fs/${VIRTUAL_VUETIFY_SASS}/${file}`
      }
    },

    load(id) {
      if (id.startsWith(`/@fs/${VIRTUAL_VUETIFY_SASS}/`)) {
        const file = REGEX_1.exec(id)![1]
        return tempFiles.get(file)
      }

      if (id.startsWith(`/@${VIRTUAL_VUETIFY_SASS}/`)) {
        const file = REGEX_2.exec(id)![1]
        return tempFiles.get(file)
      }
    },
  }
}
