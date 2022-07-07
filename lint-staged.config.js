module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '**/*.ts?(x)': () => 'npm run build-types'
  // '**/*.{js,jsx,tsx,ts,less,md,json}': ['prettier --write']
}
