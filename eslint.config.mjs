import next from 'eslint-config-next'

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  ...next,
  {
    ignores: [
      '**/node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'out/**',
    ],
  },
]

export default config

