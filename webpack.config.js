const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const libraryName = 'floorplan-react';
const npmRegistry = 'floorplan-react';

const { NODE_ENV = 'development' } = process.env;
console.log('NODE_ENV: ', NODE_ENV);
const srcFolder = path.join(__dirname, 'src');
const sectionNames = [];
const files = [];
const entries = {};
let internalExternals = {};

const linkString = NODE_ENV === 'production' ? npmRegistry : '../';
const indexLinkString = NODE_ENV === 'production' ? npmRegistry : './';

const sections = fs.readdirSync(srcFolder);
sections.forEach((section) => {
  sectionNames.push(section);
  const components = fs.readdirSync(path.join(srcFolder, section));

  components.forEach((component) => {
    const name = component.split('.')[0];
    if (!name || name === 'index') {
      return;
    }
    const file = `./src/${section}/${name}/index.js`;
    files.push(file);
    entries[`${name}/index`] = file;

    if (section !== name) {
      internalExternals = Object.assign(internalExternals, {
        [`./components/${section}`]: `${indexLinkString}${section}`, // main index
        [`../${section}/${name}`]: `${linkString}${name}`, // local index
        [`../../${section}/${name}`]: `${linkString}${name}`, // internal reference index
      });
    }
  });
});
console.log('ENTRIES:', JSON.stringify(entries, null, 2));

const config = {
  mode: NODE_ENV,
  entry: entries,
  externals: Object.assign({
    react: 'react',
    'prop-types': 'prop-types',
    classnames: 'classnames',
    'react-router-dom': 'react-router-dom',
    'react-transition-group': 'react-transition-group',
    'react-transition-group/CSSTransitionGroup': 'react-transition-group/CSSTransitionGroup',
    'react-transition-group/TransitionGroup': 'react-transition-group/TransitionGroup',
    'react-modal': 'react-modal',
    animejs: 'animejs',
    'babel-runtime': 'babel-runtime',
    'lodash/isEqual': 'lodash/isEqual',
    'lodash/omit': 'lodash/omit',
    // Use more complicated mapping for lodash.
    // We need to access it differently depending
    // on the environment.
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: '_',
      root: '_',
    },
  }, internalExternals),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    modules: ['node_modules', path.resolve('./src')],
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '../../../utils/dev':
        NODE_ENV === 'development' ? path.resolve('./src/utils/dev') : path.resolve('./src/utils/prod'),
    },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].map.js',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-cssnext')({ browsers: ['last 2 versions', '> 5%'] }),
              ],
            },
          },
        ],
      },
    ],
  },
};

module.exports = config;
