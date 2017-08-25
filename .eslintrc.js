module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  // "extends": "eslint:recommended",
  "extends": [
    "standard",
    "standard-flow",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "standard/no-callback-literal": "off",
    // "indent": [
    //     "error",
    //     4
    // ],
    // "linebreak-style": [
    //     "error",
    //     "windows"
    // ],
    "quotes": [
        "error",
        "single"
    ],
    "semi": [
        "error",
        "never"
    ]
  }
};
