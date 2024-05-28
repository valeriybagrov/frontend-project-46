import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest, 
      }
    },
    rules: {
      'semi': ['error', 'always'],
      'no-multi-spaces': ['error'],
      'camelcase': ['error',],
      'no-irregular-whitespace': ['error',],
    }
  },
  pluginJs.configs.recommended,
];