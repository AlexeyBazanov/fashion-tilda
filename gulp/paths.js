module.exports = {
  src: {
    html: 'src/html/*.html',
    css: 'src/sass/*.scss',
    js: 'src/js/**/*.js',
    images: 'src/images/**/*',
    fonts: 'src/fonts/**/*',
  },
  watch: {
    html: 'src/**/*.html',
    css: 'src/sass/**/*.scss',
    js: 'src/js/**/*.js',
    images: 'src/images/**/*',
    fonts: 'src/fonts/**/*',
  },
  build: {
    html: 'build/html',
    css: 'build/css',
    js: 'build/js',
    images: 'build/images',
    fonts: 'build/fonts',
  },
  inject: {
    html: 'build/html/**/*.html',
    css: 'build/css/**/*.css',
    js: 'build/js/**/*.js',
  },
  clean: 'build/',
};
