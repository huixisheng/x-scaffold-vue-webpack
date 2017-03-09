module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  'globals': {
    '$': true,
    'F': true,
    'require': true
  },
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    'func-names': 0,
    'import/no-unresolved': 0,
    'new-cap': [0, { 'newIsCap': false }],
    "comma-dangle": [0, 'never'],
    'quote-props': [2, 'as-needed', { 'keywords': false, 'unnecessary': false, 'numbers': false }],
    'object-shorthand': [0, 'always'],
    'no-unused-vars': 0,
    'prefer-arrow-callback': [0, {
      'allowNamedFunctions': false,
      'allowUnboundThis': true,
    }],
    'prefer-const': 0,
    "no-console": ["warn", { allow: ["warn", "error", "log"] }],
    'space-before-function-paren': [2, {"anonymous": "always", "named": "always"}],
    'prefer-template': 0,
    'no-restricted-syntax': [
      0,
      'DebuggerStatement',
      // 'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'dot-notation': [0, { 'allowKeywords': false }],
    'no-underscore-dangle': [0, { 'allowAfterThis': false }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  }
}
