import _ from "lodash";

const calculateSpacesCount = (depth, number, leftShift) => number * depth - leftShift;

const assembleStrOfOBj = (array, bracketSpace) => ['{',
 ...array,
  `${' '.repeat(bracketSpace)}}`
].join('\n');

const stringtify = (value, spacesCount) => {
  const depthSpaces = calculateSpacesCount(1, 4, 0);
  if (_.isObject(value) && !_.isArray(value)) {
    const result = Object.entries(value)
    .map(([k, v]) => `${' '.repeat(spacesCount)}${k}: ${stringtify(v, spacesCount + depthSpaces)}`);

    return assembleStrOfOBj(result, spacesCount - depthSpaces);
  } else return value;
};

const formater = (obj) => {
  const { status, key, value, newValue, inlineSpaces } = obj;
  const nextTab = inlineSpaces + calculateSpacesCount(1, 4, 2) + calculateSpacesCount(1, 4, 0);
  let sign;

  if (status === 'updated') {
  return `${' '.repeat(inlineSpaces)}- ${key}: ${stringtify(value, nextTab)}
${' '.repeat(inlineSpaces)}+ ${key}: ${stringtify(newValue, nextTab)}`;
  }

  else if (status === 'same') sign = ' ';
  else if (status === 'rejected') sign = '-';
  else if (status === 'added') sign = '+';


  return `${' '.repeat(inlineSpaces)}${sign} ${key}: ${stringtify(value, nextTab)}`;
};

export { stringtify, calculateSpacesCount, assembleStrOfOBj, formater};