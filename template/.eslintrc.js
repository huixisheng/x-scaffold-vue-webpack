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
    // 'no-unused-vars': 'off',
    'global-require': 'off',
    // https://eslint.cn/docs/rules/guard-for-in
    'guard-for-in': 'off',
    // specify the maximum length of a line in your program
  },
};
