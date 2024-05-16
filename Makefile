install:
	npm ci

# gendiff -h:
# 	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

fix:
	npx eslint --fix .

