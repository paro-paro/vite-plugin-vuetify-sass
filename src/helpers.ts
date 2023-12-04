import { createRequire } from 'node:module'
import { cwd } from 'node:process'
import { dirname, isAbsolute, relative } from 'pathe'
import { SOURCE_VUETIFY_STYLES } from './constants'

export function getVuetifyRootDir(): string {
  const require = createRequire(import.meta.url)
  return dirname(require.resolve('vuetify/package.json', { paths: [cwd()] }))
}

export function isSubdir(parent: string, child: string): boolean {
  const rel = relative(parent, child)
  return !!(rel && !rel.startsWith('..') && !isAbsolute(rel))
}

export function isVuetifyComponentStyle(source: string, importer: string | undefined): boolean {
  return !!(
    importer
    && source.endsWith('.css')
    && isSubdir(getVuetifyRootDir(), isAbsolute(source) ? source : importer)
  )
}

export function isVuetifyMainStyle(source: string): boolean {
  return source === SOURCE_VUETIFY_STYLES
}
