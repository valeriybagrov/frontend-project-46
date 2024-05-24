/* eslint-env jest */

import gendiff from "../src/index.js";
import { fileURLToPath } from 'url';  
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test("2d files json", () => {
  const path1 =  getFixturePath("file1.json");
  const path2 = getFixturePath("file2.json");

  const result = gendiff(path1, path2);
  const answer = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(result).toEqual(answer);
});

test("2d files yaml", () => {
  const path1 =  getFixturePath("file1.yaml");
  const path2 = getFixturePath("file2.yml");

  const result = gendiff(path1, path2);
  const answer = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(result).toEqual(answer);
});
