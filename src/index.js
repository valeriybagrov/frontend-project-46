import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import _ from 'lodash';
import parse from './parsers.js';

const getKeyValStr = (key, value, sign) => `  ${sign} ${key}: ${value}`;

const gendiff = (path1, path2) => {
  // get files
  const file1 = readFileSync(resolve(path1));
  const file2 = readFileSync(resolve(path2));

  const data1 = parse(file1, path1);
  const data2 = parse(file2, path2);

  // get sorted keys arrs to carring out
  const keys1 = _.sortBy(Object.keys(data1));
  const keys2 = _.sortBy(Object.keys(data2));

  const fille1Diff = keys1.reduce((acc, key) => {
    if (keys2.includes(key)) {
      if (data2[key] === data1[key]) acc.push(getKeyValStr(key, data1[key], ' '))
      else {
        // old value from file1
        acc.push(getKeyValStr(key, data1[key], '-'))
        // new value from file2
        acc.push(getKeyValStr(key, data2[key], '+'))
      }
    } else acc.push(getKeyValStr(key, data1[key], '-'))
  return acc;
  }, ['{']);
  // add new data from file2
  const bothFileDiff = keys2.reduce((acc, key) => {
    if (!keys1.includes(key)) acc.push(getKeyValStr(key, data2[key], '+'));
    return acc;
  }, fille1Diff)

  bothFileDiff.push('}')
  return bothFileDiff.join('\n');
};

export default gendiff;