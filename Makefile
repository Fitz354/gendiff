install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js --format plain __tests__/fixtures/config1.ini __tests__/fixtures/config2.ini
build:
	npm run build
lint:
	npm run eslint
test:
	make lint
	npm test
watch:
	npm run watch
publish:
	npm publish
