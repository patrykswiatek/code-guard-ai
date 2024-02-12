const { resolve } = require('node:path')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@repo/eslint-config/library.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
}
