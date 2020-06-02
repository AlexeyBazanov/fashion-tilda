const gulp = require('gulp');
const injectLib = require('gulp-inject');
const paths = require('../paths');

const htmlminConfig = {
  collapseWhitespace: true,
};

const injectHtmlToJs = () => {

  return gulp.src(paths.inject.js)
    .pipe(injectLib(gulp.src(paths.inject.html), {
      starttag: '/* inject-html:{{path}} */',
      endtag: '/* endinject-html */',
      relative: true,
      removeTags: true,
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
          .replace(/(\r\n|\n|\r)/gm,"")
          .replace(/[\""]/g, '\\"')
          .replace(/[\'']/g, "\\'")
      }
    }))
    .pipe(gulp.dest(paths.build.js));
};

module.exports = injectHtmlToJs;
