import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      'semi': ['error', 'always'],
      'no-multi-spaces': 'error',
      'camelcase': 'error',
      'no-irregular-whitespace': 'error',
      'no-trailing-spaces': 'error',
      'space-infix-ops': 'error',
      'quotes': [2, 'single'],
      'eol-last': 'error',
    }
  },
  pluginJs.configs.recommended
];
