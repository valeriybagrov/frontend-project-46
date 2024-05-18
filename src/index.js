import { readFileSync } from 'node:fs';
import path from 'node:path';

const parse = (file) => JSON.parse(file);

const gendiff = (path1, path2) => {
  const file1 = readFileSync(path.resolve(path1));
  const file2 = readFileSync(path.resolve(path2));

  return [ parse(file1), parse(file2) ];
};

export default gendiff;