install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js src/test/configs/json1.json src/test/configs/json2.json
test:
	npm test
publish:
	npm publish
lint:
	npm run eslint
