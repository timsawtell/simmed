.PHONY: test lint run

test:
	yarn jest

lint:
	yarn run eslint . --ext .ts

run:
	yarn
	yarn run ts-node runnable.ts

build-web:
	yarn run webpack-cli
	cp src/web/index.html dist