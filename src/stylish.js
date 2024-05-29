import _ from "lodash";

const stringtify = (value, countSpaces) => {
  if (_.isObject(value)) {
    const isValueArray = _.isArray(value);
    const [openBracket, closeBracket] = isValueArray ? ['[', ']'] : ['{', '}'];
    const result = isValueArray ? 
    value.map((el) => `${' '.repeat(countSpaces)}${el}`) : 
    Object.entries(value)
    .map(([k, v]) => `${' '.repeat(countSpaces)}${k}: ${stringtify(v, countSpaces + 4)}`);

    return [openBracket,
      ...result,
      `${' '.repeat(countSpaces - 4)}${closeBracket}`
    ].join('\n');
    } else return value;
};

const calculateSpacesCount = (depth, number, leftShift) => number * depth - leftShift;

const assembleStrOfOBj = (array, spaceCount) => ['{',
 ...array,
  `${' '.repeat(spaceCount - 2)}}`].join('\n');

const formater = (obj) => {
  const { status, key, value, newValue, spaces } = obj;
  let sign;

  if (status === 'updated') {
  return `${' '.repeat(spaces)}- ${key}: ${stringtify(value, spaces + 6)}
${' '.repeat(spaces)}+ ${key}: ${stringtify(newValue, spaces + 6)}`;
  }

  else if (status === 'same') sign = ' ';
  else if (status === 'rejected') sign = '-';
  else if (status === 'added') sign = '+';


  return `${' '.repeat(spaces)}${sign} ${key}: ${stringtify(value, spaces + 6)}`;
};

export { calculateSpacesCount, assembleStrOfOBj, formater};