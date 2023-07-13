/** @type {import("eslint").Linter.Config} */
module.exports = {
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    // Disable for now until pages is working
    // https://github.com/cloudflare/next-on-pages/tree/main/packages/eslint-plugin-next-on-pages#eslint-plugin-next-on-pages
    // 'next-on-pages/missing-image-loader': 0,
  },
};
