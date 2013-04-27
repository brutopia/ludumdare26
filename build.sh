#!/bin/bash
node_modules/uglify-js2/bin/uglifyjs2 -o game.min.js src/*.js
node_modules/uglify-js2/bin/uglifyjs2 -o screens.min.js screens/*.js
