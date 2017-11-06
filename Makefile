install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js __tests__/fixtures/json1.json __tests__/fixtures/json2.json
test:
	npm test
publish:
	npm publish
lint:
	npm run eslint
