import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import _ from 'lodash';
import parse from './parsers.js';
import toFormStr from './stylish.js';

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
    const spaceCount = 4 * depth - 2;

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
          return `${' '.repeat(spaceCount + 2)}${key}: ${iter(value1, value2, depth + 1)}`;
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
      return toFormStr(objToSend);
    });

    return ['{', ...final, `${' '.repeat(spaceCount - 2)}}`].join('\n');
    // const firstPart = keys1.flatMap((key) => {
    //   const objToSend = new Object();
    //   objToSend.spaces = spaceCount;
    //   objToSend.key = key;
    //   const value1 = node1[key];
  
    //   if (keys2.includes(key)) {
    //     const value2 = node2[key];
      
    //     if (!_.isObject(value1) && !_.isObject(value2)) {
    //       if (value1 === value2) {
    //         objToSend.status = 'same';
    //         objToSend.oldValue = value1;
    //         objToSend.newValue = value1;
    //       } else {
    //         objToSend.status = 'updated';
    //         objToSend.oldValue = value1;
    //         objToSend.newValue = value2;
    //       }
    //     } else return `${' '.repeat(spaceCount)}  ${key}: ${iter(value1, value2, depth + 1)}`;
    //   } else {
    //     objToSend.status = "rejected";
    //     objToSend.oldValue = value1;
    //     objToSend.newValue = value1;
    //   }
    //   return toFormStr(objToSend);
    // });

    // const secondPart = keys2
    // .filter((key) => !keys1.includes(key))
    // .flatMap((key) => {
    //   const objToSend = new Object();
    
    //   objToSend.status = 'added';
    //   objToSend.key = key;
    //   objToSend.oldValue = node2[key];
    //   objToSend.newValue = node2[key];
    //   objToSend.spaces = spaceCount;
    //   return toFormStr(objToSend);
    // });
    // const full = firstPart.concat(secondPart);
    // return ['{', ...full, `${' '.repeat(spaceCount - 2)}}`].join('\n');
  };
  return iter(data1, data2, 1);
};

export default gendiff;
no-irregular-whitespace
no-multi-spaces
camelcase     