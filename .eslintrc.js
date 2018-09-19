// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'arrow-parens': 0,
    'semi': [1,'never'],
    'indent': [2,4,{'SwitchCase': 1}],
    'comma-dangle': [0,'always-multiline'],
    'one-var': 0
  }
}
