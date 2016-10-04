// - - - - NPM MODULES
var gulp = require('gulp');
var shell = require('shelljs'); // this accomplishes both bower and npm installs

gulp.task('git-check', function(done){
  if (!shell.which('git')) {
    console.log('Git is not installed. Please install Git to continue');
    process.exit(1);
  }

  done();
});

gulp.task('npm:install', gulp.series('git-check', function npmInstall(done){
    if (shell.exec('npm install').code !== 0) {
            shell.echo('Error: npm install failed');
        shell.exit(1);
    }

    done();
}));

gulp.task('install', gulp.series('git-check', 'npm:install'));

