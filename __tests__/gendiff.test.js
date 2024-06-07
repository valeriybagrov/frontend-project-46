/* eslint-env jest */

import gendiff from "../src/index.js";
import { fileURLToPath } from 'url';  
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const result2d = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test("2d files JSON", () => {
  const path1 = getFixturePath("file1.json");
  const path2 = getFixturePath("file2.json");

  const result = gendiff(path1, path2);
  expect(result).toEqual(result2d);
});

test("2d files YAML", () => {
  const path1 = getFixturePath("file1.yaml");
  const path2 = getFixturePath("file2.yml");

  const result = gendiff(path1, path2);
  expect(result).toEqual(result2d);
});

const result3d =`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

test("3d files JSON", () => {
  const path1 = getFixturePath("file3.json");
  const path2 = getFixturePath("file4.json");

  const result = gendiff(path1, path2);
  expect(result).toEqual(result3d);
});

test("3d files YAML", () => {
  const path1 = getFixturePath("file3.yaml");
  const path2 = getFixturePath("file4.yml");

  const result = gendiff(path1, path2);
  expect(result).toEqual(result3d);
});

const toPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

test("plain", () => {
  const path1 = getFixturePath("file3.yaml");
  const path2 = getFixturePath("file4.yml");

  const result = gendiff(path1, path2, 'plain');
  expect(result).toEqual(toPlain);
});