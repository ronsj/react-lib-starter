import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

const isProduction = !process.env.ROLLUP_WATCH;

const UMD_NAME = pkg.name
  .split('-')
  .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
  .join('');

export default (async () => ({
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.cjs.js', // package.json -> "main"
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/bundle.esm.js', // package.json -> "module"
      format: 'esm',
      sourcemap: true,
    },
    {
      esModule: false,
      file: 'dist/bundle.umd.js',
      format: 'umd',
      globals: {
        react: 'React',
      },
      name: UMD_NAME,
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
    commonjs(),
    isProduction && (await import('rollup-plugin-terser')).terser(),
  ],
  external: ['react'],
}))();
