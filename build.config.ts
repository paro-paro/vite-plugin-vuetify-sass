import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  declaration: true,
  sourcemap: true,
  failOnWarn: true,
  entries: ['./src/index'],
  outDir: 'dist',
  rollup: {
    emitCJS: true,
  },
})
