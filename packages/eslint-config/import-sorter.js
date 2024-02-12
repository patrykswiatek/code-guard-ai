const { resolve } = require('node:path')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['plugin:import/recommended', 'plugin:import/typescript'],
  settings: {
    'import/resolver': {
      typescript: {
        project: resolve(__dirname, 'tsconfig.json'),
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: [resolve(__dirname)],
      },
    },
  },
  rules: {
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent'],
          'index',
          'unknown',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
}
