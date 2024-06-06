import _ from "lodash";

const calculateSpacesCount = (depth, number, leftShift) => number * depth - leftShift;

const assembleStrOfOBj = (array, depth) => {
  const bracketSpace = calculateSpacesCount(depth, 4, 4);
  return ['{',
  ...array,
   `${' '.repeat(bracketSpace)}}`
 ].join('\n');
};

const stringtify = (value, depth) => {
  const fullTab = calculateSpacesCount(depth, 4, 0);
  if (_.isObject(value) && !_.isArray(value)) {
    const result = Object.entries(value)
    .map(([k, v]) => `${' '.repeat(fullTab)}${k}: ${stringtify(v, depth + 1)}`);

    return assembleStrOfOBj(result, depth);
  } else return value;
};

export default (tree) => {
  const iter = (node, depth) => {

    const result = node.map((el) => {
      const { status, key, value, newValue } = el;
      const inlineSpaces = calculateSpacesCount(depth, 4, 2);
      let sign;
      let nestObj;
      switch (status) {
        case 'nested': 
          nestObj = iter(value, depth + 1);
          return `${' '.repeat(inlineSpaces)}  ${key}: ${nestObj}`;

        case 'updated': return `${' '.repeat(inlineSpaces)}- ${key}: ${stringtify(value, depth + 1)}\n${' '.repeat(inlineSpaces)}+ ${key}: ${stringtify(newValue, depth + 1)}`;
        case 'unchanged':
          sign = ' ';
          break;
        case 'rejected':
          sign = '-';
          break;
        case 'added':
          sign = '+';
          break;
        default:
          throw new Error('invalid tree / invalid node type');
      }

    return `${' '.repeat(inlineSpaces)}${sign} ${key}: ${stringtify(value, depth + 1)}`;
    });

    return assembleStrOfOBj(result, depth);
  };
  return iter(tree, 1);
};
