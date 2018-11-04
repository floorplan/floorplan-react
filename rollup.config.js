import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';
import colors from "colors";
import fileSize from "filesize";
import gzip from "gzip-size";
import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import localResolve from 'rollup-plugin-local-resolve';
import { uglify } from 'rollup-plugin-uglify';

const externals = [
  '@fortawesome/fontawesome-free',
  '@fortawesome/fontawesome-svg-core',
  '@fortawesome/free-brands-svg-icons',
  '@fortawesome/free-regular-svg-icons',
  '@fortawesome/free-solid-svg-icons',
  '@fortawesome/react-fontawesome',
  'emotion',
  'react',
  'react-dom',
];

// Rollup plugin to replace routes (current existing ones did not work)
function replaceRelativeRoutes (options = {}) {
  return {
    transformChunk: ( source, outputOptions, chunk ) => {
      return {code: source
        .replace(/(\')(\.\/|\.\.\/)(\.\.\/)*(atoms|molecules|organisms|templates|pages|theme)/g, '\'..')
        .replace(/(\")(\.\/|\.\.\/)(\.\.\/)*(atoms|molecules|organisms|templates|pages|theme)/g, '\"..')
      };
    }
  }
}

// Rollup plugin to replace routes (current existing ones did not work)
function replaceNodeEnv (options = {}) {
  return {
    transformChunk: ( source, outputOptions, chunk ) => {
      return {code: source.replace(/process.env.NODE_ENV/g, (options.NODE_ENV && `"${options.NODE_ENV}"`) || `"${process.env.NODE_ENV}"` || '"development"')};
    }
  }
}


// Render function for filesize that also shows file change size
const render = (name) => (opt, size, minifiedSize, bundle) => {
	const primaryColor = "black";
	const secondaryColor = "blue";

	const title = colors[primaryColor].bold;
  const value = colors[secondaryColor];
  const increase = colors.red;
  const decrease = colors.green;

  const originalCode = fs.existsSync(bundle.file) ? fs.readFileSync(bundle.file) : null;
  const originalCodeSize = {
    bundle: originalCode ? Buffer.byteLength(originalCode) : size,
    gzip: originalCode ? gzip.sync(originalCode) : minifiedSize,
  };
  
  const fileSizeChange = size - originalCodeSize.bundle;
  const gzipSizeChange = minifiedSize - originalCodeSize.gzip;

  const fileSizeChangeStr = fileSizeChange < 0 ? decrease(`(decreased ${fileSize(Math.abs(fileSizeChange))})`) : fileSizeChange > 0 && increase(`(increased ${fileSize(Math.abs(fileSizeChange))})`);
  const gzipSizeChangeStr = gzipSizeChange < 0 ? decrease(`(decreased ${fileSize(Math.abs(gzipSizeChange))})`) : gzipSizeChange > 0 && increase(`(increased ${fileSize(Math.abs(gzipSizeChange))})`);

	const values = [
		...(bundle.file ? [`${title("Destination: ")}${value(bundle.file)}`] : []),
		...[`${title("Bundle Size: ")} ${value(fileSize(size))} ${fileSizeChangeStr || ''}`],
    ...[`${title("Minified and Gzipped Size: ")} ${value(fileSize(minifiedSize))} ${gzipSizeChangeStr || ''}`],
	];

	return values.join(" ");
}

// simpler version of filesize plugin
function filesize(options = {}, env) {
	const getData = function(bundle, code) {
		let size = Buffer.byteLength(code);

		let minifiedSize = gzip.sync(code);

		return options.render(options, size, minifiedSize, bundle);
	};

	if (env === "test") {
		return getData;
	}

	return {
    name: "filesize",
		ongenerate(bundle, { code }) {
			console.log(getData(bundle, code));
		}
	};
}

function addIndexToShipProdOrDev({ fileName = ''}) {
  return {
    buildEnd(){
      const filePath = `${__dirname}/dist/${fileName}`
      const indexPath = `${__dirname}/dist/${fileName}/index.js`
      
      if (fs.existsSync(filePath) && fs.existsSync(indexPath)) {
        return;
      }

      const indexFile = `'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./${fileName}.production.min.js');
} else {
  module.exports = require('./${fileName}.development.js');
}
      `;
      
      mkdirp(filePath, () => {
        fs.writeFile(indexPath, indexFile, (err) => {
          if (err) throw err;
        });
      });
    }
  }
}


const { NODE_ENV = 'development' } = process.env;
console.log('NODE_ENV: ', NODE_ENV);
const srcFolder = path.join(__dirname, 'src');
const sectionNames = [];
const files = [];
const entries = {};
let internalExternals = [];

const linkString = '../';

const sections = fs.readdirSync(srcFolder);
sections.forEach((section) => {
  if (section.includes('__') || section.includes('babelrc')) return;
  sectionNames.push(section);
  const components = fs.readdirSync(path.join(srcFolder, section));

  components.forEach((component) => {
    const [name, type] = component.split('.');
    if (type) {
      return;
    }
    if (!name || name === 'index') {
      return;
    }
    const file = `./src/${section}/${name}/index.js`;
    files.push(file);
    entries[`${name}`] = file;

    if (section !== name) {
      internalExternals.push(`../${section}/${name}`);
      internalExternals.push(`../../${section}/${name}`);
      internalExternals.push(`../../../${section}/${name}`);
    }
  });
});

const getFileName = (name) =>
  `./dist/${name}/${name}${NODE_ENV === 'production' ? '.production.min' : '.development'}.js`

const getBuild = () => Object.keys(entries).map((name) => ({
  input: entries[name],
  external: [...externals, ...internalExternals],
  output: [
    { file: getFileName(name), format: 'cjs'},
  ],
  plugins: [
    peerDepsExternal(),
    babel({
      // exclude: 'node_modules/**',
      // plugins: ['external-helpers']
      runtimeHelpers: true,
    }),
    localResolve(),
    resolve({
      extensions: [ '.js', '.jsx', '.json' ],
    }),
    replaceNodeEnv({NODE_ENV}),
    commonjs(),
    NODE_ENV === 'production' && uglify(),
    replaceRelativeRoutes(),
    addIndexToShipProdOrDev({fileName: name}),
    filesize({ render: render(name) }),
  ],
}))

export default getBuild();
