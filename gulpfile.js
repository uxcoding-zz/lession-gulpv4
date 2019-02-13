  'use strict';

  const {
    src,
    dest,
    parallel,
    watch
  } = require('gulp');
  
  var gulpSass = require('gulp-sass');
  var gulpUglify = require('gulp-uglify');
  var gulpCleanCss = require('gulp-clean-css');

  var path = {
    typeSheet: {
      src: 'version/dev-version/css/*',
      dest: 'version/pro-version/css/'
    },
    typeScript: {
      src: 'version/dev-version/js/*.js',
      dest: 'version/pro-version/js/'
    }
  }

  function compileSheet() {
    return src(path.typeSheet.src)
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(gulpCleanCss())
      .pipe(dest(path.typeSheet.dest));
  }

  function compileScript() {
    return src(path.typeScript.src)
      .pipe(gulpUglify())
      .pipe(dest(path.typeScript.dest));
  }

  function compileWatch() {
    watch(path.typeSheet.src, compileSheet);
    watch(path.typeScript.src, compileScript);
  }

  exports.gulpCleanCss = gulpCleanCss;
  exports.compileSheet = compileSheet;
  exports.compileScript = compileScript;
  exports.compileWatch = compileWatch;

  exports.default = parallel(compileSheet, compileScript, compileWatch);
