module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'semi': 'off',
    'no-undef': 'off',
    'vue/require-v-for-key': 'off',
    'eqeqeq': 'off',
    'object-shorthand': 'off',
    'vue/attributes-order': 'off',
    'no-console': 'off'
  }
}
