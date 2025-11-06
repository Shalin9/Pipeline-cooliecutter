export default [
  {
    ignores: ["node_modules/**", "build/**", "dist/**"],
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  }
];
