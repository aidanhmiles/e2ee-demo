
var gulp = require('gulp');

gulp.task('serve', server);

function server(done){

    var started = false;

    return require('gulp-nodemon')({
        exec: 'node --debug',
        script: 'server/index.js',
        delayTime: 1,
        env: {
            'PORT': 8080
        },
        port: 8080,
        ext: 'js json yaml',
        watch: ['server/'],
        legacyWatch: true,
        debug: true
        // ignore: ['client/', 'gulp*', 'paths.js']
    }).on('start', function(){
        // to avoid nodemon being started multiple times
        if (!started) {
            started = true;
            done();
        }
    })
    .on('restart', function(ev) {
        console.log('*** nodemon restarted');
        console.log('files changed on restart:\n' +ev);
    }) 
    .on('crash', function() {
        console.log('*** nodemon crashed: script crashed for some reason');
    }) 
    .on('exit', function() {
        console.log('*** nodemon exited cleanly');
    });
}

