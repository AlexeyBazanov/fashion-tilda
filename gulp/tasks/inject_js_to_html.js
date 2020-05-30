const gulp = require('gulp');
const injectLib = require('gulp-inject');
const paths = require('../paths');

const injectJsToHtml = () => {

  return gulp.src(paths.inject.html)
    .pipe(injectLib(gulp.src(paths.inject.js), {
      starttag: '/* inject-js:{{path}} */',
      endtag: '/* endinject-js */',
      relative: true,
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    .pipe(gulp.dest(paths.build.html));
};

module.exports = injectJsToHtml;
