import { resolve } from 'path'

import { CracoEsLintConfig, CracoWebpackConfig } from '@craco/types'

const eslint: CracoEsLintConfig = {
  configure: {
    root: true,
    extends: ['@repo/eslint-config/react.js', 'react-app', 'react-app/jest'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: true,
    },
  },
}

const webpack: CracoWebpackConfig = {
  alias: {
    '@': resolve(__dirname, 'src'),
  },
}

const exportedConfigObjects = {
  eslint,
  webpack,
}

export default exportedConfigObjects
