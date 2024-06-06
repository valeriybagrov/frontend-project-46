import _ from "lodash";

const makeTree = (node1, node2) => {
  const keys1 = _.sortBy(Object.keys(node1));
  const keys2 = _.sortBy(Object.keys(node2));
  const commonKeys = _.sortBy(_.union(keys1, keys2));

  const tree = commonKeys.map((key) => {
    if (keys1.includes(key) && keys2.includes(key)) {
      const value1 = node1[key];
      const value2 = node2[key];
  
      if (_.isObject(value1) && _.isObject(value2)) return {
        status: 'nested', key, value: makeTree(value1, value2) }; 

      else if (value1 === value2) return { status: 'unchanged', key, value: value1 };
    
      else return { status: 'updated', key, value: value1, newValue: value2 };
    } 
    
    else if (keys1.includes(key) && !keys2.includes(key)) return {
      status: 'rejected', key, value: node1[key] };

      else return { status: 'added', key, value: node2[key] };
  });
  return tree;
};

export default makeTree;