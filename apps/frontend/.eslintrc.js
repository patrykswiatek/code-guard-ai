/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/react.js", "react-app", "react-app/jest"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
