import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import parse from './parsers.js';

const getDataFromFiles = (path1, path2) => {
  const file1 = readFileSync(resolve(path1));
  const file2 = readFileSync(resolve(path2));

  const data1 = parse(file1, path1);
  const data2 = parse(file2, path2);
  return [data1, data2];
};

export { getDataFromFiles };