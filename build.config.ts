import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  outDir: 'dist',
  entries: ['./src/index'],
  clean: true,
  declaration: true,
  sourcemap: true,
  externals: ['vite'],
  rollup: {
    emitCJS: true,
  },
})
