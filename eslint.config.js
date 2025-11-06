import reactPlugin from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser";

export default [
  {
    files: ["**/*.js", "**/*.jsx"],

    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: { presets: ["@babel/preset-react"] },
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        wp: "readonly",
        jQuery: "readonly",
        CLCUrls: "readonly",
        CLC: "readonly",
        define: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
      },
    },

    plugins: {
      react: reactPlugin,
    },

    rules: {
      quotes: ["error", "double", { avoidEscape: true }],
      semi: ["error", "always"],
      "no-unused-vars": ["warn", { args: "none", ignoreRestSiblings: true }],
      "no-empty": ["warn"],
      "no-cond-assign": ["error"],
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },

    ignores: [
      "node_modules/**",
      "CustomerPortal/frontend/public/js/**",
      "EmployeePortal/employee-portal-frontend/public/js/**",
      "EmployeePortal/backend/old_app_backup.js",
    ],
  },
];
