"use strict";

module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '**/*.ts?(x)': function tsX() {
    return 'npm run build-types';
  } // '**/*.{js,jsx,tsx,ts,less,md,json}': ['prettier --write']

};