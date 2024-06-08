import _ from 'lodash';

const checkKeyStatus = (key, keyCollection1, keyCollection2, value1, value2) => {
  if (keyCollection1.includes(key) && keyCollection2.includes(key)) {
    if (_.isObject(value1) && _.isObject(value2)) return 'nested';
    if (value1 === value2) return 'unchanged';
    return 'updated';
  }
  if (keyCollection1.includes(key) && !keyCollection2.includes(key)) return 'removed';

  return 'added';
};

const getNodeValues = (status, value1, value2) => {
  switch (status) {
    case 'nested': return { value: makeTree(value1, value2) };

    case 'unchanged': return { value: value1 };

    case 'removed': return { value: value1 };

    case 'updated': return {
      value: value1,
      newValue: value2,
    };

    case 'added': return { value: value2};

    default:
      throw new Error('Unexpected node status');
  }
};

const makeTree = (node1, node2) => {
  const keys1 = _.sortBy(Object.keys(node1));
  const keys2 = _.sortBy(Object.keys(node2));
  const commonKeys = _.sortBy(_.union(keys1, keys2));

  const tree = commonKeys.map((key) => {
    const value1 = node1[key];
    const value2 = node2[key];
    const status = checkKeyStatus(key, keys1, keys2, value1, value2);

    const {
      value, newValue
    } = getNodeValues(status, value1, value2);

    return {
      status, key, value, newValue
    };
  });
  return tree;
};

export default makeTree;
