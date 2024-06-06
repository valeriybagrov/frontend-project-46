import { extname } from 'node:path';
import { load } from 'js-yaml';

export default (file, path) => {
  const ext = extname(path);
  if (ext === '.json') return JSON.parse(file);
  if (ext === '.yml' || ext === '.yaml') return load(file);
};
