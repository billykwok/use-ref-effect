module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    'jest/globals': true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { impliedStrict: true },
    project: './tsconfig.json',
  },
  settings: {
    react: { version: 'detect' },
    'import/extensions': ['.js', '.json'],
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'react',
    'react-hooks',
    'prettier',
    'testing-library',
    'jest',
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'plugin:testing-library/react',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: { version: 'detect' },
        'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
        'import/extensions': ['.ts', '.tsx'],
      },
      plugins: [
        '@typescript-eslint',
        'import',
        'prettier',
        'react',
        'react-hooks',
        'testing-library',
        'jest',
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
        'plugin:prettier/recommended',
        'plugin:testing-library/react',
      ],
    },
  ],
};
