import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import formater from './formaters/formater.js';
import parse from './parsers.js';
import makeTree from './makeTree.js';

const gendiff = (path1, path2, format = 'stylish') => {
  const file1 = readFileSync(resolve(path1));
  const file2 = readFileSync(resolve(path2));

  const data1 = parse(file1, path1);
  const data2 = parse(file2, path2);

  return formater(makeTree(data1, data2), format);
};

export default gendiff;
