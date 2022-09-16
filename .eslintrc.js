module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parser: '@babel/eslint-parser',
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier'
  ],
  parserOptions: {
    requireConfigFile: false, // no babel config needed
    ecmaVersion: 11,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'prettier'
  ],
  rules: {

    'arrow-body-style': 'off',
    // ['error', 'as-needed', { requireReturnForObjectLiteral: true }], // 'as-needed' is default | 'always'

    // "react/no-unstable-nested-components": [
    //   "off" | "warn" | "error",
    //   { "allowAsProps": true | false }
    // ],
    'react/no-unstable-nested-components': 'off',

    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'off',
    'import/no-anonymous-default-export': 'off',

    '@next/next/no-img-element': 'off',

    // add new line above comment
    // 'lines-around-comment': [
    //   'error',
    //   {
    //     beforeLineComment: true,
    //     beforeBlockComment: true,
    //     allowBlockStart: true,
    //     allowClassStart: true,
    //     allowObjectStart: true,
    //     allowArrayStart: true,
    //   },
    // ],

    // add new line above return
    // 'newline-before-return': 'error',

    // add new line below import
    'import/newline-after-import': [
      'error',
      {
        count: 1,
      },
    ],

    // add new line after each var, const, let declaration
    // 'padding-line-between-statements': [
    //   'error',
    //   { blankLine: 'always', prev: ['export'], next: ['*'] },
    //   { blankLine: 'always', prev: ['*'], next: ['multiline-const', 'multiline-let', 'multiline-var', 'export'] },
    // ],

    // from previous

    'react/function-component-definition': [
      2,
      {
        namedComponents: ['arrow-function', 'function-declaration'],
        unnamedComponents: ['arrow-function', 'function-expression'],
      },
    ],
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'no-shadow': 'off',
    'react/jsx-props-no-spreading': 'off',
    // 'import/extensions': [
    //   'error',
    //   'ignorePackages',
    //   {
    //     'ts': 'never',
    //     'tsx': 'never',
    //     'js': 'never'
    //   }
    // ],
    'import/extensions': [
      'error',
      'never',
      {
        ignorePackages: true,
      },
    ],
    // 'react/jsx-filename-extension': [
    //   'warn',
    //   {
    //     extensions: ['.ts', '.tsx', '.js', '.jsx'],
    //   },
    // ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    // CONSOLE
    'no-console': 'off',
    // 'no-restricted-syntax': [
    //   'error',
    //   {
    //     'selector': 'CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]',
    //     'message': 'Unexpected property on console object was called'
    //   }
    // ],
    // UNUSED VARS
    'no-unused-vars': 'off',
    // [
    //   'error',
    //   { 'vars': 'local', 'args': 'after-used', 'ignoreRestSiblings': false }
    // ]
    // TERNARY OPERATORS
    'no-nested-ternary': 'off',
    // ELSE-IF RETURNS
    'no-else-return': [
      'off',
      {
        allowElseIf: true,
      },
    ],
    // 'no-else-returns': 'off',
    // 'object-shorthand': ['error', 'consistent-as-needed']

    // ** CHANGES TO PASS ESLINT, BUT NEED ADDRESSING
    'object-shorthand': 'off',
    'react/no-array-index-key': 'off',
    'react/destructuring-assignment': 'off',
    'prefer-arrow-callback': 'off',
    'no-param-reassign': 'off',
    'no-promise-executor-return': 'off',
    'import/prefer-default-export': 'off',
    'radix': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'camelcase': 'off',
    'react/self-closing-comp': 'off',
    'no-useless-return': 'off',
    'prefer-template': 'off',
    'dot-notation': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'off',
    'padding-line-between-statements': 'off',
    'no-undef': 'off',
  },
}
