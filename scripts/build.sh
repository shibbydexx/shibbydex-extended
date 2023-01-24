#!/bin/sh
mkdir -p ./dist
cp manifest.json ./dist/
npx tsc ./src/index.ts --outfile ./dist/index.js -w
