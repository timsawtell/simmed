.PHONY: test lint run

test:
	yarn jest

lint:
	yarn run eslint . --ext .ts

run:
	yarn
	yarn run ts-node src/simulation/simulation.ts