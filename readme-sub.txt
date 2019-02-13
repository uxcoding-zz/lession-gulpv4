
  'use strict';

  const {
    src,
    dest,
    parallel,
    watch
  } = require('gulp');
  
  // var gulp = require('gulp');
  // var gulpPlumber = require('gulp-plumber');

  var gulpSass = require('gulp-sass');
  var gulpUglify = require('gulp-uglify');

  var path = {
    typeSheet: {
      src: 'version/dev-version/css/*',
      dest: 'version/pro-version/css/'
    },
    typeScript: {
      src: 'version/dev-version/js/*.js',
      dest: 'version/pro-version/js/'
    },
    typeHtml: {
      src: 'version/dev-version/*.html',
      dest: 'version/pro-version/'
    }
  }

  // function triggerPlumber(sourceSrc, sourceDest,) {
  //   return src( sourceSrc )
  //   .pipe(gulpPlumber())
  //   .pipe(dest( sourceDest ));
  // }

  // var htmlsrc = 'version/dev-version/*.html'
  // var htmlurl = 'version/pro-version/*.html'

  // function compileMarkup() {
  //   return triggerPlumber('htmlsrc', 'htmlurl');
  // }

  // function compileMarkup() {
  //   return src(path.typeHtml.src)
  //     .pipe(dest(path.typeHtml.dest));
  // }

  function compileSheet() {
    return src(path.typeSheet.src)
      .pipe(gulpSass().on('error', gulpSass.logError))
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
  
  // exports.compileMarkup = compileMarkup;
  exports.compileSheet = compileSheet;
  exports.compileScript = compileScript;
  exports.compileWatch = compileWatch;

  exports.default = parallel(compileSheet, compileScript, compileWatch);
  // exports.default = parallel(compileSheet, compileScript, compileWatch, compileMarkup);