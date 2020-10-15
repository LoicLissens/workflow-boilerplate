const {src, dest, series,watch} = require("gulp");
const sass = require("gulp-sass");
const uglifycss = require('gulp-uglifycss');
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
function compile (){
    watch('./src/scss/*.scss',  series(scss,css))
}
module.exports = {
    
    default: series(scss,css),
    compile,
}