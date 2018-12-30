module.exports = context => ({
  plugins: {
    'postcss-rtl': {},
    pixrem: {},
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    cssnano: context.env !== 'production' ? false : {
      safe: true
    }
  }
});
