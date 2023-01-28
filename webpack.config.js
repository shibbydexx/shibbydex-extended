const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  plugins: [
    //new CopyPlugin({
    //})
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
