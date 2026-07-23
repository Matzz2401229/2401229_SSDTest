const security = require('eslint-plugin-security');
const noUnsanitized = require('eslint-plugin-no-unsanitized');

module.exports = [
  { ignores: ['node_modules/**'] },
  security.configs.recommended,
  noUnsanitized.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
      },
    },
  },
];
