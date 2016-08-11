var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
  var config = {};

  if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  config.debug = !isProd || !isTest;

  config.entry = isTest ? {} : {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    //this is where the bootstraping occurs
    'app': './src/main.ts'
  };

  config.output = isTest ? {} : {
    path: root('dist'),
    publicPath: isProd ? '/' : 'http://localhost:8080/',
    filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
    chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
  };

  config.resolve = {
    cache: !isTest,
    root: root(),
    // only these extensions get picked up
    extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html', '.jade'],
    alias: {
      'app': 'src/app',
      'common': 'src/common'
    }
  };

  config.module = {
    preLoaders: isTest ? [] : [{test: /\.ts$/, loader: 'tslint'}],
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template-loader'],
        exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },
      {test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file?name=fonts/[name].[hash].[ext]?'},
      {test: /\.json$/, loader: 'json'},
      { test: /\.jade$/, loader: 'jade-loader' },
      {
        test: /\.css$/,
        exclude: root('src', 'app'),
        loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
      },
      {test: /\.css$/, include: root('src', 'app'), loader: 'raw!postcss'},
      {
        test: /\.scss$/,
        exclude: root('src', 'app'),
        loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
      },
      {test: /\.scss$/, exclude: root('src', 'style'), loader: 'raw!postcss!sass'},
      {test: /\.html$/, loader: 'raw'}
    ],
    postLoaders: [],
    noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/]
  };

  if (isTest) {
    config.module.postLoaders.push({
      test: /\.ts$/,
      include: path.resolve('src'),
      loader: 'istanbul-instrumenter-loader',
      exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
    });

    config.ts = {
      compilerOptions: {
        sourceMap: false,
        sourceRoot: './src',
        inlineSourceMap: true
      }
    };
  }

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    })
  ];

  if (!isTest) {
    config.plugins.push(
      new CommonsChunkPlugin({
        name: ['vendor', 'polyfills']
      }),

      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        chunksSortMode: 'dependency'
      }),

      new ExtractTextPlugin('css/[name].[hash].css', {disable: !isProd})
    );
  }

  if (isProd) {
    config.plugins.push(
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new CopyWebpackPlugin([{
        from: root('src/public')
      }])
    );
  }

  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];

  config.sassLoader = {
    //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
  };

  config.tslint = {
    emitErrors: false,
    failOnHint: false
  };

  config.devServer = {
    contentBase: './src/public',
    historyApiFallback: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  };

  return config;
}();

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
