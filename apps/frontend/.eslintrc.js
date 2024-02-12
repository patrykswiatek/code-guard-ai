const { resolve } = require('node:path')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@repo/eslint-config/react.js', 'react-app', 'react-app/jest'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
}
