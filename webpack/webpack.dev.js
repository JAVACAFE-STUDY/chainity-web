const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'development';

module.exports = (options) => webpackMerge(commonConfig({ env: ENV }), {
  devtool: 'cheap-module-source-map', // https://reactjs.org/docs/cross-origin-errors.html
  mode: ENV,
  entry: [
    'react-hot-loader/patch',
    './src/main/webapp/app/index'
  ],
  output: {
    path: utils.root('build/www'),
    filename: 'app/[name].bundle.js',
    chunkFilename: 'app/[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    stats: options.stats,
    hot: true,
    contentBase: './build/www',
    proxy: {
      // jHipster 기존 설정 내용
      '/api': {
          target: `http${options.tls ? 's' : ''}://127.0.0.1:8080`,
          secure: false,
          changeOrigin: options.tls,
          headers: { host: 'localhost:9000' }
        },
      '/management': {
          target: `http${options.tls ? 's' : ''}://127.0.0.1:8080`,
          secure: false,
          changeOrigin: options.tls,
          headers: { host: 'localhost:9000' }
        },
      '/swagger-resources': {
          target: `http${options.tls ? 's' : ''}://127.0.0.1:8080`,
          secure: false,
          changeOrigin: options.tls,
          headers: { host: 'localhost:9000' }
        },
      '/v2/api-docs': {
          target: `http${options.tls ? 's' : ''}://127.0.0.1:8080`,
          secure: false,
          changeOrigin: options.tls,
          headers: { host: 'localhost:9000' }
        },
      '/h2-console': {
          target: `http${options.tls ? 's' : ''}://127.0.0.1:8080`,
          secure: false,
          changeOrigin: options.tls,
          headers: { host: 'localhost:9000' }
        },
      '/auth': {
          target: `http${options.tls ? 's' : ''}://127.0.0.1:8080`,
          secure: false,
          changeOrigin: options.tls,
          headers: { host: 'localhost:9000' }
        },
      // 자바 코인 백엔드 api
      '/v1/': {
        target: 'http://localhost:8090',
        secure: false,
      }
    },
    watchOptions: {
      ignored: /node_modules/
    }
  },
  stats: process.env.JHI_DISABLE_WEBPACK_LOGS ? 'none' : options.stats,
  plugins: [
    process.env.JHI_DISABLE_WEBPACK_LOGS
      ? null
      : new SimpleProgressWebpackPlugin({
          format: options.stats === 'minimal' ? 'compact' : 'expanded'
        }),
    new FriendlyErrorsWebpackPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 9000,
      proxy: {
        target: 'http://localhost:9060'
      },
      socket: {
        clients: {
          heartbeatTimeout: 60000
        }
      }
    }, {
      reload: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new writeFilePlugin(),
    new webpack.WatchIgnorePlugin([
      utils.root('src/test'),
    ]),
    new WebpackNotifierPlugin({
      title: 'JHipster',
      contentImage: path.join(__dirname, 'logo-jhipster.png')
    })
  ].filter(Boolean)
});
