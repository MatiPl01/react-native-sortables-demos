// eslint.config.js
import eslintConfig from 'eslint-config-react-native-matipl01';

export default [
  {
    ignores: ['.expo/**', '.vscode/**', 'scripts/**', 'node_modules/**']
  },
  ...eslintConfig
];
