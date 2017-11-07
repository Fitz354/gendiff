install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js __tests__/fixtures/config1.ini __tests__/fixtures/config2.ini
build:
	npm run build
test:
	npm test
lint:
	npm run eslint
publish:
	npm publish
