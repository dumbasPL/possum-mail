/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'google',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'max-len': 'off',
    'require-jsdoc': 'off',
    'indent': ['error', 2],
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': 'error',
    'padded-blocks': ['warn', {classes: 'always', switches: 'never', blocks: 'never'}],
    'linebreak-style': 'off',
    'arrow-parens': ['warn', 'as-needed'],
    'new-cap': 'off',
  },
};
