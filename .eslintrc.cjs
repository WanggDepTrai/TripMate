module.exports = {
   root: true,
   env: { browser: true, es2020: true, node: true },
   extends: ['eslint:recommended', 'prettier'],
   ignorePatterns: ['.eslintrc.cjs', '*.config.js', '*.config.ts', '*.slice.ts', '*.config.cjs', 'additional.d.ts'],

   overrides: [
      {
         files: ['*.ts', '*.tsx'],
         extends: [
            'plugin:@typescript-eslint/recommended',
            'plugin:@typescript-eslint/recommended-type-checked',
            'plugin:import/typescript',
            'prettier',
         ],
         parser: '@typescript-eslint/parser',
         plugins: ['@typescript-eslint', 'react-hooks', 'eslint-plugin-react'],
         parserOptions: {
            project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.eslint.json'],
            tsconfigRootDir: __dirname,
         },
         rules: {
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/naming-convention': [
               'error',
               {
                  selector: 'default',
                  format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                  leadingUnderscore: 'allow',
               },
               {
                  selector: 'variable',
                  types: ['boolean'],
                  format: ['PascalCase'],
                  prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
               },
               {
                  selector: 'typeLike',
                  format: ['PascalCase'],
               },
               {
                  selector: 'parameter',
                  format: ['camelCase'],
               },
            ],
            'react-hooks/exhaustive-deps': 'warn',
         },
      },
      {
         files: ['.eslintrc.cjs', 'tailwind.config.ts'],
         rules: {
            'prettier/prettier': 'off',
         },
      },
   ],
   rules: {
      'import/order': [
         'error',
         {
            'newlines-between': 'always',
            pathGroups: [
               { pattern: '@app', group: 'internal' },
               { pattern: '@app/**', group: 'internal' },
               { pattern: '@assets', group: 'internal' },
               { pattern: '@assets/**', group: 'internal' },
               { pattern: '@components', group: 'internal' },
               { pattern: '@components/**', group: 'internal' },
               { pattern: '@constants', group: 'internal' },
               { pattern: '@constants/**', group: 'internal' },
               { pattern: '@helpers', group: 'internal' },
               { pattern: '@helpers/**', group: 'internal' },
               { pattern: '@pages', group: 'internal' },
               { pattern: '@pages/**', group: 'internal' },
               { pattern: '@language', group: 'internal' },
               { pattern: '@language/**', group: 'internal' },
               { pattern: '@layout', group: 'internal' },
               { pattern: '@layout/**', group: 'internal' },
               { pattern: '@utils', group: 'internal' },
               { pattern: '@utils/**', group: 'internal' },
               { pattern: '@configs', group: 'internal' },
               { pattern: '@configs/**', group: 'internal' },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
            groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index'], 'unknown'],
            alphabetize: {
               order: 'asc',
               caseInsensitive: true,
            },
         },
      ],
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-extra-semi': 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      indent: ['error', 2],
      'no-trailing-spaces': 'error',
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'always'],
      'arrow-spacing': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'eol-last': ['error', 'always'],
      'import/order': ['error', { 'newlines-between': 'always' }],
   },
   plugins: ['import'],
   settings: {
      'import/resolver': {
         node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
         },
         typescript: true,
      },
      react: {
         version: 'detect',
      },
   },
};
