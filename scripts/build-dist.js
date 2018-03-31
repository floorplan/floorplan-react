const fs = require('fs-extra');
const glob = require('globby');

const filePaths = glob.sync(['src/**/*.*'], {
  ignore: [
    'src/**/*.snap',
    'src/**/*.{stories,spec,test}*',
    '**/{story-helpers,__mocks__}/**'
  ]
});

filePaths.forEach(filePath => fs.copySync(filePath, `dist/${filePath}`));
fs.copySync('package.json', 'dist/package.json');
