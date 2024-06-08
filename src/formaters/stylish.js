import _ from 'lodash';

const calculateSpacesCount = (depth, number, leftShift) => number * depth - leftShift;

const assembleStrOfOBj = (array, depth) => {
  const bracketSpace = calculateSpacesCount(depth, 4, 4);
  return ['{',
    ...array,
    `${' '.repeat(bracketSpace)}}`,
  ].join('\n');
};

const stringtify = (value, depth) => {
  const fullTab = calculateSpacesCount(depth, 4, 0);
  if (_.isObject(value) && !_.isArray(value)) {
    const result = Object.entries(value)
      .map(([k, v]) => `${' '.repeat(fullTab)}${k}: ${stringtify(v, depth + 1)}`);

    return assembleStrOfOBj(result, depth);
  }
  return value;
};

export default (tree) => {
  const iter = (node, depth) => {
    const result = node.map((el) => {
      const {
        status, key, value, newValue
      } = el;
      const inlineSpaces = calculateSpacesCount(depth, 4, 2);
      switch (status) {
        case 'nested':
          return `${' '.repeat(inlineSpaces)}  ${key}: ${iter(value, depth + 1)}`;

        case 'updated':
          return `${' '.repeat(inlineSpaces)}- ${key}: ${stringtify(value, depth + 1)}\n${' '.repeat(inlineSpaces)}+ ${key}: ${stringtify(newValue, depth + 1)}`;

        case 'unchanged':
          return `${' '.repeat(inlineSpaces)}  ${key}: ${stringtify(value, depth + 1)}`;

        case 'removed':
          return `${' '.repeat(inlineSpaces)}- ${key}: ${stringtify(value, depth + 1)}`;

        case 'added':
          return `${' '.repeat(inlineSpaces)}+ ${key}: ${stringtify(value, depth + 1)}`;

        default:
          throw new Error('invalid tree / invalid node type');
      }
    });

    return assembleStrOfOBj(result, depth);
  };
  return iter(tree, 1);
};
