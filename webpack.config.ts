import { resolve } from 'path'

import CopyPlugin from 'copy-webpack-plugin'

import { alias } from './dev-helpers/alias'
import { externals } from './dev-helpers/dependencies'

export default {
  target: 'node',
  mode: 'production',
  entry: resolve('src/main.ts'),
  output: {
    path: resolve('dist'),
    filename: 'index.js',
  },
  resolve: {
    alias,
    extensions: ['.js', '.ts'],
  },
  externals: {
    ...externals,
    mongoose: 'commonjs mongoose',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['@babel/preset-typescript'],
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: resolve('.env'),
          to: resolve('dist'),
        },
      ],
    }),
  ],
}
