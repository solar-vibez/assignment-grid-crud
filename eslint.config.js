import react from '@eslint-react/eslint-plugin'
import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import * as tsParser from '@typescript-eslint/parser'
import vitest from '@vitest/eslint-plugin'
import barrelFiles from 'eslint-plugin-barrel-files'
import * as depend from 'eslint-plugin-depend'
import nounsanitized from 'eslint-plugin-no-unsanitized'
import perfectionist from 'eslint-plugin-perfectionist'
import playwright from 'eslint-plugin-playwright'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { configs as sonarConfigs } from 'eslint-plugin-sonarjs'
import storybook from 'eslint-plugin-storybook'
import tailwind from 'eslint-plugin-tailwindcss'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import path from 'path'
import tseslint, { configs as tslintConfig } from 'typescript-eslint'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  {
    ignores: ['.vscode/*', 'package-lock.json', 'public'],
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: {
        cache: true,
        parser: tsParser,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: 'module',
    },
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    name: '"default" settings',
    settings: {
      'import/resolver': { typescript: { alwaysTryTypes: true } },
      // suppress warnings in terminal output due to recent changes in tailwind v4
      // see https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/431#issuecomment-3513947402
      tailwindcss: {
        config: path.join(__dirname, './tailwind.config.js'),
      },
    },
  },
  js.configs.recommended,
  ...tslintConfig.strictTypeChecked,
  ...tslintConfig.stylisticTypeChecked,
  perfectionist.configs['recommended-natural'],
  sonarConfigs.recommended,
  ...tailwind.configs['flat/recommended'],
  nounsanitized.configs.recommended,
  depend.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    name: 'react check',
    ...react.configs['recommended-type-checked'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    name: 'react hooks+refresh check',
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['error'],
    },
  },
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...eslintPluginUnicorn.configs['recommended'],
    languageOptions: { globals: globals.browser },
    name: 'unicorn check',
    plugins: { unicorn: eslintPluginUnicorn },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/*.test.*'],
    plugins: { 'barrel-files': barrelFiles },
    rules: {
      'barrel-files/avoid-namespace-import': 'error',
      'barrel-files/avoid-re-export-all': 'error',
    },
  },
  {
    files: ['**/*.test.ts'],
    plugins: { vitest },
    rules: { ...vitest.configs.recommended.rules },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['./e2e/**/*.spec.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': 'off',
      'playwright/no-conditional-in-test': 'off',
      'playwright/no-force-option': 'off',
      'playwright/no-wait-for-timeout': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...stylistic.configs.recommended,
    languageOptions: { globals: globals.browser },
    name: 'stylistic check',
    plugins: { '@stylistic': stylistic },
    rules: {
      // '@stylistic/array-bracket-spacing': ['error', 'always'],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }],
      '@stylistic/keyword-spacing': ['error', { after: true, before: true }],
      '@stylistic/lines-between-class-members': ['error', 'always'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'return' },
        { blankLine: 'always', next: '*', prev: 'var' },
        { blankLine: 'always', next: 'var', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'if' },
        { blankLine: 'always', next: 'if', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'for' },
        { blankLine: 'always', next: 'for', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'while' },
        { blankLine: 'always', next: 'while', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'block-like' },
        { blankLine: 'always', next: 'block-like', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'multiline-expression' },
      ],
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/space-unary-ops': ['error', { nonwords: false, words: true }],
      '@stylistic/spaced-comment': [
        'error',
        'always',
        {
          exceptions: ['#region', '#endregion', '/'],
          markers: ['#region', '#endregion', '/'],
        },
      ],
      // '@stylistic/space-in-parens': ['error', 'always'],
      // '@stylistic/computed-property-spacing': ['error', 'always'],
      // '@stylistic/template-curly-spacing': ['error', 'always'],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    name: 'exceptions/deviations',
    rules: {
      '@eslint-react/prefer-read-only-props': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      /** For suppressing error for <form onSubmit(handler)> in react-form-hooks */
      '@typescript-eslint/no-misused-promises': [
        2,
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      '@typescript-eslint/non-nullable-type-assertion-style': ['off'],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],
      'classnames-order': 'off', // We already have this via prettier plugin
      curly: ['error', 'all'],
      'func-names': ['error', 'as-needed'],
      'no-console': 'warn',
      'no-multiple-empty-lines': ['error', { max: 3, maxBOF: 1, maxEOF: 2 }],
      'no-restricted-syntax': [
        'error',
        {
          message: 'Prefer named exports/no default exports',
          selector: 'ExportDefaultDeclaration',
        },
        {
          message: 'Prefer arrow functions over function expressions',
          selector: 'FunctionExpression',
        },
        {
          message: 'Prefer arrow functions over function declarations',
          selector: 'FunctionDeclaration',
        },
      ],
      'prefer-arrow-callback': ['error'],
      'sonarjs/cognitive-complexity': ['error', 10],
      'sonarjs/todo-tag': 'warn',
      'sonarjs/void-use': 'off', // Conflicts with @typescript-eslint/ no-floating-promises
      'tailwindcss/enforces-shorthand': 'error',
      'tailwindcss/no-custom-classname': 'off',
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['\\.tsx$', '\\.ts$'],
        },
      ],
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-useless-undefined': [
        'error',
        {
          checkArguments: false,
        },
      ],
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  {
    files: ['**/*.schema.{ts,tsx,js}'],
    name: 'exceptions for zod schema files',
    rules: {
      'sonarjs/redundant-type-aliases': ['off'], // Allow util aliases like "Id"
    },
  },
  {
    files: ['**/*.stories.{ts,tsx}', '**/.storybook/preview.tsx'],
    name: 'exceptions for storybook files',
    rules: {
      'no-console': 'off', // Allow console logs in stories
      'no-restricted-syntax': 'off', // Allow stories to export default
      'react-hooks/rules-of-hooks': 'off', // Disable hooks rules for stories
      'react-refresh/only-export-components': 'off', // Disable react-refresh for stories
    },
  },
  {
    files: ['**/*.config.{ts,tsx}'],
    name: 'exceptions for config files',
    rules: {
      'no-restricted-syntax': 'off', // Allow config files to export default
    },
  },
  {
    files: ['**/*.js'],
    name: 'js without typings check',
    ...tslintConfig.disableTypeChecked,
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    name: 'exceptions for unit test files',
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['**/*.e2e.ts', 'e2e/**/*.ts'],
    name: 'exceptions for e2e test files',
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'no-console': 'off',
      'react-hooks/rules-of-hooks': 'off',
    },
  },
  {
    files: ['src/routes/**/*.{ts,tsx}'],
    name: 'exceptions for TanStack router files',
    rules: {
      'perfectionist/sort-objects': 'off', // Conflicts with @tanstack/ router/ create-route-property-order
    },
  },
  storybook.configs['flat/recommended'],
)
