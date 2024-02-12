/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['./library.js'],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
  },
}
