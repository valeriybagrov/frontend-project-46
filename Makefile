install:
	npm ci

publish:
	npm publish --dry-run

run:
	node bin/gendiff.js __fixtures__/file3.json __fixtures__/file4.json

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
