const gulp = require('gulp');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const mode = require('gulp-mode')();
const minify = require('gulp-minify');
const paths = require('../paths');

const scripts = () => {
  return gulp
    .src(paths.src.js)
    .pipe(plumber())
    .pipe(babel())
    // .pipe(concat('scripts.js'))
    .pipe(mode.production(uglify()))
    .pipe(minify())
    .pipe(gulp.dest(paths.build.js));
};

module.exports = scripts;
