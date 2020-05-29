const gulp = require('gulp');
const injectLib = require('gulp-inject');
const paths = require('../paths');

const injectCssToJs = () => {
  return gulp.src(paths.inject.js)
    .pipe(injectLib(gulp.src(paths.inject.css), {
      starttag: '/* inject:{{path}} */',
      endtag: '/* endinject */',
      relative: true,
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    .pipe(gulp.dest(paths.build.js));
};

module.exports = injectCssToJs;
