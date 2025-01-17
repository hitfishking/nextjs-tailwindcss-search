module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'no-tabs': 'off',
    'arrow-parens': ['error', 'always'],
    camelcase: 'off',
    // '@typescript-eslint/camelcase': 'off',
    'no-unused-vars': 'off',
    'space-before-function-paren': 'error',
    'no-mixed-spaces-and-tabs': 'off',
    'no-use-before-define': 'off'
  }
}
