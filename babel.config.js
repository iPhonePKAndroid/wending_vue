module.exports = {
  presets: [
    '@vue/app', {
      useBuiltIns: 'entry'
    }
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ],
  browserslist: [
    'ie 10'
  ]
}
