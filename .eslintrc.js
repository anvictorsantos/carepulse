module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'next',
        'eslint:recommended',
        'prettier',
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    plugins: [
        'prettier',
        '@typescript-eslint',
        'react',
        'react-hooks',
        'perfectionist',
    ],
    root: true,
    rules: {
        // TypeScript rules
        '@typescript-eslint/array-type': [
            'warn',
            {
                default: 'array',
            },
        ],
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-restricted-imports': [
            'error',
            {
                patterns: ['.*'],
            },
        ],
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        'no-var': 'warn',
        'object-shorthand': 'warn',
        'perfectionist/sort-exports': [
            'error',
            {
                groupKind: 'mixed',
                ignoreCase: true,
                order: 'asc',
                partitionByComment: false,
                partitionByNewLine: false,
                type: 'alphabetical',
            },
        ],
        'perfectionist/sort-imports': [
            'error',
            {
                customGroups: {
                    type: {
                        react: ['react', 'react-*'],
                    },
                    value: {
                        lib: '@/lib/*',
                        react: ['react', 'react-*'],
                        types: '@/types/*',
                    },
                },
                environment: 'node',
                groups: [
                    'react',
                    'internal',
                    'lib',
                    'types',
                    'side-effect',
                    'parent',
                    'style',
                ],
                ignoreCase: true,
                internalPattern: ['@/**'],
                matcher: 'minimatch',
                maxLineLength: undefined,
                newlinesBetween: 'always',
                order: 'asc',
                type: 'alphabetical',
            },
        ],
        'perfectionist/sort-interfaces': ['error'],
        'perfectionist/sort-objects': [
            'error',
            {
                type: 'alphabetical',
            },
        ],
        // JavaScript rules
        'prefer-const': 'warn',
        'prettier/prettier': 'warn',
        'quote-props': ['warn', 'as-needed'],
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react/jsx-filename-extension': [
            'warn',
            {
                extensions: ['ts', 'tsx'],
            },
        ],
        // React rules
        'react/jsx-fragments': ['warn', 'syntax'], // Shorthand syntax for React fragments
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
    },
    settings: {
        'import/resolver': {
            alias: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                map: [['@', '.']],
            },
        },
        react: {
            version: 'detect',
        },
    },
};
