import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      globals: {
        browser: true,
        node: true,
      },
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      "no-unused-vars": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
