import _ from "lodash";

const checkKeyStatus = (key, keyCollection1, keyCollection2, value1, value2) => {
  let status;

  if (keyCollection1.includes(key) && keyCollection2.includes(key)) { 

    if (_.isObject(value1) && _.isObject(value2)) status = 'nested';
    else if (value1 === value2) status = 'unchanged';
    else status = 'updated';

  } else if (keyCollection1.includes(key) && !keyCollection2.includes(key)) status = 'removed';
  else status = 'added';

  return status;
};

const getNodeValues = (status, value1, value2) => {
  let value;
  let newValue = undefined;
  
  switch (status) {
    case 'nested':
      value = makeTree(value1, value2);
      break;
    case 'unchanged':
      value = value1;
      break;
    case 'updated':
      value = value1;
      newValue = value2;
      break;
    case 'removed':
      value = value1;
      break;
    case 'added':
      value = value2;
      break;
    default:
      break;
  }
  return { value, newValue };
};

const makeTree = (node1, node2) => {
  const keys1 = _.sortBy(Object.keys(node1));
  const keys2 = _.sortBy(Object.keys(node2));
  const commonKeys = _.sortBy(_.union(keys1, keys2));

  const tree = commonKeys.map((key) => {
    const value1 = node1[key];
    const value2 = node2[key];
    const status = checkKeyStatus(key, keys1, keys2, value1, value2);

    const { value, newValue } = getNodeValues(status, value1, value2);

    return { status, key, value, newValue };
  });
  return tree;
};

export default makeTree;
