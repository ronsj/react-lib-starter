import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

const UMD_NAME = pkg.name
  .split('-')
  .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
  .join('');

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    {
      esModule: false,
      file: pkg.browser,
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
  ],
  external: ['react'],
};
