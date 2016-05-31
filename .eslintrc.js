module.exports = {
  "extends": ["eslint:recommended", "plugin:meteor/recommended"],
  "installedESLint": true,
  "plugins": [
    "react",
    "meteor"
  ],
  "rules": {
    "comma-dangle": [1, "never"]
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  }
};
