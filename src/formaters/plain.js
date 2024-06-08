import _ from 'lodash';

const stringtify = (value) => {
  if (_.isString(value)) return `'${value}'`;
  if (_.isObject(value)) return '[complex value]';
  return value;
};

const createDiscription = (status, path, value, newValue) => {
  let changingDiscription = '';

  if (status === 'updated') changingDiscription = `. From ${stringtify(value)} to ${stringtify(newValue)}`;
  else if (status === 'added') changingDiscription = ` with value: ${stringtify(value)}`;

  return `Property '${path}' was ${status}${changingDiscription}`;
};

const plain = (tree, path) => {
  const result = tree.flatMap((node) => {
    const {
 status, key, value, newValue
} = node;
    const newPath = path ? `${path}.${key}` : key;

    if (status === 'nested') return plain(value, newPath);
    if (status === 'unchanged') return [];

    return createDiscription(status, newPath, value, newValue);
  });
  return result.join('\n');
};

export default plain;
