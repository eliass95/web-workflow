var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function(){
    // inicia o server do projeto.
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    // verifica modificação no html e recarrega.
    watch('./app/index.html', function(){
        browserSync.reload();
    });

    // verifica alteração em qualquer arquivo css
    watch('./app/assets/styles/**/*.css', function(){
        gulp.start('cssInject'); 
    });
});

// injeta css novo na página após a execução da dependência styles.
gulp.task('cssInject', ['styles'], function(){
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream()); // injeta css sem reload da página.
});