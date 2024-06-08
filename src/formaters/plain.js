import _ from 'lodash';

const stringtify = (value) => {
  if (_.isString(value)) return `'${value}'`;
  if (_.isObject(value)) return '[complex value]';
  return value;
};

const createDiscription = (status, path, value, newValue) => {
  switch (status) {
    case 'updated':
      return `Property '${path}' was ${status}. From ${stringtify(value)} to ${stringtify(newValue)}`;

    case 'added':
      return `Property '${path}' was ${status} with value: ${stringtify(value)}`;

    case 'removed':
      return `Property '${path}' was ${status}`;

    default:
      return [];
  }
};

const plain = (tree, path) => {
  const result = tree.flatMap((node) => {
    const {
      status, key, value, newValue
    } = node;
    const newPath = path ? `${path}.${key}` : key;

    if (status === 'nested') return plain(value, newPath);

    return createDiscription(status, newPath, value, newValue);
  });
  return result.join('\n');
};

export default plain;
