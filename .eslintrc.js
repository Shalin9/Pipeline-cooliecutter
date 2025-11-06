module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: { jsx: true }
  },
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  globals: {
    wp: "readonly",
    jQuery: "readonly",
    CLCUrls: "readonly",
    CLC: "readonly",
    define: "readonly"
  },
  plugins: ["react"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  rules: {
    quotes: ["error", "double", { avoidEscape: true }],
    semi: ["error", "always"],
    "no-unused-vars": ["warn", { args: "none", ignoreRestSiblings: true }],
    "no-empty": ["warn"],
    "no-cond-assign": ["error"],
    "react/jsx-uses-vars": "error",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off"
  }
};
