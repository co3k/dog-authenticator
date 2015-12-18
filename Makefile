NPM = npm
NODE_MODULES = ./node_modules
GULP_BIN=$(NODE_MODULES)/.bin/gulp

install:
	$(NPM) install

build:
	rm -rf dist
	$(GULP_BIN) templates js

server:
	PORT=8887 node server.js
