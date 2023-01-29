const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        {from: './manifest.json', to: './'},
        {from: './img/*.png', to: './'},
        {from: './src/config/config.html', to: './config/'},
      ]
    })
  ],
  entry: {
    './index': './src/index.ts',
    './config/index': './src/config/index.ts',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
}
