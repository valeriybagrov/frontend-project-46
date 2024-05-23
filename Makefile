install:
	npm ci

publish:
	npm publish --dry-run

run:
	node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

lint:
	npx eslint .

fix:
	npx eslint --fix .
