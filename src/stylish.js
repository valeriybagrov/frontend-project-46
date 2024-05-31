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

const formater = (obj) => {
  const { status, key, value, newValue, depth } = obj;
  const inlineSpaces = calculateSpacesCount(depth, 4, 2);

  let sign;

  if (status === 'updated') {
  return `${' '.repeat(inlineSpaces)}- ${key}: ${stringtify(value, depth + 1)}
${' '.repeat(inlineSpaces)}+ ${key}: ${stringtify(newValue, depth + 1)}`;
  }

  else if (status === 'same') sign = ' ';
  else if (status === 'rejected') sign = '-';
  else if (status === 'added') sign = '+';


  return `${' '.repeat(inlineSpaces)}${sign} ${key}: ${stringtify(value, depth + 1)}`;
};

export { stringtify, assembleStrOfOBj, formater};