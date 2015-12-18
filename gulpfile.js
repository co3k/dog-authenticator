'use strict';

const gulp = require('gulp');
const webpack = require('gulp-webpack');
const named = require('vinyl-named');

gulp.task('templates', () =>
    gulp.src('src/templates/**/*')
        .pipe(gulp.dest('dist/'))
);

gulp.task('js', () =>
    gulp.src('src/assets/js/**/*')
        .pipe(named())
        .pipe(webpack())
        .pipe(gulp.dest('dist/assets/js/'))
);
