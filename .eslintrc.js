module.exports = {
  "plugins": [
    "jest",
    "react"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true
  },
  "globals": {
    "module": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "react/prop-types": [
      0
    ],
    "react/display-name": [
      0
    ],
    "react/no-render-return-value": [
      0
    ],
    "react/no-unescaped-entities": [
      0
    ]
  }
};