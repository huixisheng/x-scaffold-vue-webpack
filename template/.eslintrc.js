module.exports = {
  root: true,
  // parser: 'babel-eslint',
  // parserOptions: {
  //   sourceType: 'module'
  // },
  extends: 'style-guide',
  // extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [

  ],
  env: {
    browser: true,
    node: true,
  },
  globals: {

  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js',
      },
    },
  },
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // This rule warns the usage of `console`
    // 不禁用 console
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-unused-vars': 'off',
    'global-require': 'off',
    // https://eslint.cn/docs/rules/guard-for-in
    'guard-for-in': 'off',
    // specify the maximum length of a line in your program
  },
};
