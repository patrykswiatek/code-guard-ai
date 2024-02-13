import { resolve } from 'path'
import fs from 'fs'

import {
  CracoEsLintConfig,
  CracoPluginDefinition,
  CracoWebpackConfig,
} from '@craco/types'

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath: string) => resolve(appDirectory, relativePath)

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

const plugins: CracoPluginDefinition<{ includes: string[] }>[] = [
  {
    plugin: require('craco-babel-loader'),
    options: {
      includes: [resolveApp('../../packages/types')],
    },
  },
]

const exportedConfigObjects = {
  eslint,
  webpack,
  plugins,
}

export default exportedConfigObjects
