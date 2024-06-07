import stylish from "./stylish.js";
import plain from "./plain.js";

export default (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    default:
      throw new Error('Unavailable format');
  }
};