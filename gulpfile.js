const {src, dest, series,watch} = require("gulp");
const sass = require("gulp-sass");
const uglifycss = require('gulp-uglifycss');
const terser = require('gulp-terser');
const rollup = require('rollup-stream');
const buffer = require('vinyl-buffer'); // needed because terser or gulp-uglify does not support stream
const source = require('vinyl-source-stream');

function scss (){
    return src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist'));
}
function css(){
    return src('./dist/*.css')
    .pipe(uglifycss({
      "uglyComments": true
    }))
    .pipe(dest('./dist/'));
}
function jsBundle(){ 
    return rollup({
        input: './src/js/index.js',
        format: 'umd', // umd is uniervsal module declaration
      })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(terser())
      .pipe(dest('./dist'));
  
}
function compile (){
    watch('./src/scss/*.scss',  series(scss,css))
}
module.exports = {
    
    default: series(scss,css),
    compile,
    jsBundle,
}