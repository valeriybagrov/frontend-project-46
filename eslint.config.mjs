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
    }
  },
  pluginJs.configs.recommended,
];