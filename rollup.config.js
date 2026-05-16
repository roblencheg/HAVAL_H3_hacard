import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/haval-h3-dashboard-card.js',
    format: 'es',
    sourcemap: true,
    inlineDynamicImports: true,
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
    }),
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    terser({
      format: {
        comments: false,
      },
    }),
  ],
  external: [],
};
