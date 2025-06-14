import eslintConfig from 'eslint-config-react-native-matipl01';

export default [
  {
    ignores: ['.expo/**', '.vscode/**', 'scripts/**', 'node_modules/**']
  },
  ...eslintConfig,
  {
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off'
    }
  }
];
