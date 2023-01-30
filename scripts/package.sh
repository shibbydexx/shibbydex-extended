#!/bin/sh
mkdir -p ./dist
zip -r shibbydexx-source.zip *
npx webpack
cd dist/ && zip -r -FS ../shibbydexx-firefox.zip * && cd ..
rm dist/manifest.json
cp manifest-v3.json dist/manifest.json
cd dist/ && zip -r -FS ../shibbydexx-chrome.zip * && cd ..
