import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import _ from 'lodash';
import parse from './parsers.js';
import { calculateSpacesCount, assembleStrOfOBj, formater } from './stylish.js';

const getDataFromFiles = (path1, path2) => {
  const file1 = readFileSync(resolve(path1));
  const file2 = readFileSync(resolve(path2));

  const data1 = parse(file1, path1);
  const data2 = parse(file2, path2);
  return [data1, data2];
};

const gendiff = (path1, path2) => {
  const [data1, data2] = getDataFromFiles(path1, path2);

  const iter = (node1, node2, depth) => {
    const spaceCount = calculateSpacesCount(depth, 4, 2);

    const keys1 = _.sortBy(Object.keys(node1));
    const keys2 = _.sortBy(Object.keys(node2));

    const commonKeys = _.sortBy(_.union(keys1, keys2));

    const final = commonKeys.map((key) => {
      const objToSend = new Object();
      objToSend.spaces = spaceCount;
      objToSend.key = key;

      if (keys1.includes(key) && keys2.includes(key)) {
        const value1 = node1[key];
        const value2 = node2[key];

        if (_.isObject(value1) && _.isObject(value2)) {
          objToSend.status = 'same';
          objToSend.value = iter(value1, value2, depth + 1);
          return formater(objToSend);
        } else if (value1 === value2) {
          objToSend.status = 'same';
          objToSend.value = value1;
        } else {
          objToSend.status = 'updated';
          objToSend.value = value1;
          objToSend.newValue = value2;
        }
      }
      else if (keys1.includes(key) && !keys2.includes(key)) {
        objToSend.status = "rejected";
        objToSend.value = node1[key];
      } else {
        objToSend.status = 'added';
        objToSend.value = node2[key];
      }
      return formater(objToSend);
    });

    return assembleStrOfOBj(final, spaceCount);
  };
  return iter(data1, data2, 1);
};

export default gendiff;
