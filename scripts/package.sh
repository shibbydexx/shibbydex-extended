#!/bin/sh
mkdir -p ./dist
zip -r shibbydexx-source.zip *
npx webpack
cd dist/ && zip -r -FS ../shibbydexx.zip * && cd ..
