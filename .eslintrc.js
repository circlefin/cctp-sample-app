module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'standard',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:sonarjs/recommended',
  ],
  parserOptions: {
    // sourceType "module" is already added by react-app
    ecmaVersion: 2022,
  },
  env: {
    // browser and node envs are automatically added by react-app
    es2022: true,
    jest: true,
  },
  rules: {
    radix: 'error',
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-console': ['warn', { allow: ['debug', 'warn', 'error'] }],
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'react/jsx-curly-brace-presence': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'sonarjs/no-identical-functions': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/cognitive-complexity': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      // @typescript-eslint/parser should come here, but it's already added by react-app
      parserOptions: {
        // The jsx ecma feature is already added by react-app

        // Required by many rules. See: https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/linting/TYPED_LINTING.md
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'standard-with-typescript',
        'plugin:import/typescript',
      ],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          {
            allowString: true,
            allowNumber: false,
            allowNullableObject: true,
            allowNullableBoolean: true,
            allowNullableString: true,
            allowNullableNumber: false,
            allowAny: false,
          },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variableLike',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
            filter: {
              regex: '^__typename$', // Exceptions should be placed here like this: ^(Property-Name-One|Property-Name-Two)$
              match: false,
            },
          },
        ],
        '@typescript-eslint/unbound-method': [
          'error',
          {
            ignoreStatic: true,
          },
        ],
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: false,
          },
        ],

        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
      },
    },
    {
      files: '*',
      extends: [
        // We must keep prettier inside this override to make sure it will come in the end of the configs list
        // and will disable possible conflicting rules that might have been enabled in one of the previous overrides.
        // This will add the plugin, extend the prettier configuration, enable the prettier/prettier rule and disable conflicting rules.
        'plugin:prettier/recommended',
      ],
      rules: {
        // These are non-TypeScript rules that will be executed after Prettier.
        // We should only put here the non-TypeScript rules that Prettier disables but we want to enable them anyway.
        // Prettier instructs us to enable this rule if we want to forbid unnecessary backticks.
        // See: https://github.com/prettier/eslint-config-prettier#forbid-unnecessary-backticks
        quotes: 'error', // No need to pass the options here because they were already passed by the StandardJS config.

        // We should be extra careful when enabling rules that were disabled for conflict reasons.
        // Currently, only two rules fall into this category: arrow-body-style and prefer-arrow-callback.
        // See: https://github.com/prettier/eslint-config-prettier#arrow-body-style-and-prefer-arrow-callback
        // "arrow-body-style": ["error", "as-needed"], // Check if we can enable it in the future.
        // "prefer-arrow-callback": "error", // Check if we can enable it in the future.
      },
    },
    {
      files: ['**/*.ts?(x)'],
      rules: {
        // These are TypeScript rules that will be executed after Prettier.
        // We should only put here TypeScript rules that Prettier disables but we want to enable them anyway.
        '@typescript-eslint/quotes': 'error', // No need to pass the options here because they were already passed by the StandardJS config.
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.d.ts', '.ts', '.tsx', '.js', 'jsx'],
        moduleDirectory: ['node_modules', 'src'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      version: 'detect',
    },
  },
}
