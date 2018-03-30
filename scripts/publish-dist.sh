#!/bin/bash
npm run build:prod

echo 'PUBLISHING TO NPM'
cd ./dist
npm publish --access public
cd ../
