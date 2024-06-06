import _ from "lodash";

const makeTree = (node1, node2) => {
  const keys1 = _.sortBy(Object.keys(node1));
  const keys2 = _.sortBy(Object.keys(node2));
  const commonKeys = _.sortBy(_.union(keys1, keys2));

  const tree = commonKeys.map((key) => {
    let status;
    let value;
    let newValue = undefined;

    const value1 = node1[key];
    const value2 = node2[key];

    if (keys1.includes(key) && keys2.includes(key)) {  
      if (_.isObject(value1) && _.isObject(value2)) {
        status = 'nested';
        value = makeTree(value1, value2);
      } else if (value1 === value2) {
        status = 'unchanged';
        value = value1;
      } else {
        status = 'updated';
        value = value1;
        newValue = value2;
      }
    } else if (keys1.includes(key) && !keys2.includes(key)) {
      status = 'rejected';
      value = value1;
    } else {
      status = 'added';
      value = value2;
    }

    return { status, key, value, newValue };
  });
  return tree;
};

export default makeTree;