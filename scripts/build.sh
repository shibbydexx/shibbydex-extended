#!/bin/sh
mkdir -p ./dist
cp manifest.json ./dist/
npx webpack watch
