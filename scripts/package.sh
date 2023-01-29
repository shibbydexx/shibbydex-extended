#!/bin/sh
mkdir -p ./dist
npx webpack
cd dist/ && zip -r -FS ../shibbydexx.zip * && cd ..
