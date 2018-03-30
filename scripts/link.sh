#!/bin/sh

yarn build:link
echo "Ensuring @floorplan/react is properly linked..."
cd dist
yarn unlink && yarn link
cd ../
echo "@floorplan/react is linked"
