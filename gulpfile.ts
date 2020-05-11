const { spawn, exec } = require('child_process');
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import gutil from 'gulp-util';
import path from 'path';
import fs from 'fs';
import config from './config';

const consoleLog = (data: { toString: () => string }) => gutil.log(data.toString().trim());

const toWatch = ['./src', './swagger'];

if (fs.existsSync(config.config.swaggerDirPath)) {
  toWatch.push(config.config.swaggerDirPath);
}

gulp.task('server', () =>
  nodemon({
    script: './bin/www',
    watch: toWatch,
    ext: 'js yaml',
    ignore: ['build/**'],
    env: {
      DEBUG: 'server:server',
      NODE_PATH: path.resolve(__dirname, 'server'),
      NODE_ENV: 'development'
    }
  })
);

function runCommand(command: string) {
  return async function (cb: (arg0: any) => void) {
    await exec(command, function (err: any, stdout: any, stderr: any) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  };
}

gulp.task('mongo', runCommand('mongod --port 27017 --dbpath /Users/briantical/data/db'));

gulp.task('run:dev', gulp.series('mongo', 'server'));
