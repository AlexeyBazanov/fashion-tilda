const gulp = require('gulp');
const injectLib = require('gulp-inject');
const paths = require('../paths');

const injectCssToHtml = () => {
  const sources = gulp.src([paths.inject.css, paths.inject.js], {
    read: false,
  });

  // return gulp
  //   .src(paths.inject.html)
  //   .pipe(injectLib(sources, { relative: true }))
  //   .pipe(gulp.dest(paths.build.html));

  return gulp.src(paths.inject.html)
    .pipe(injectLib(gulp.src(paths.inject.css), {
      starttag: '/* inject:{{path}} */',
      endtag: '/* endinject */',
      relative: true,
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    .pipe(gulp.dest(paths.build.html));

};

module.exports = injectCssToHtml;
