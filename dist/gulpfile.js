"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { spawn, exec } = require('child_process');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gutil = require('gulp-util');
const path = require('path');
const fs = require('fs');
const { config } = require('./config');
const consoleLog = (data) => gutil.log(data.toString().trim());
const toWatch = ['./src', './swagger'];
if (fs.existsSync(config.swaggerDirPath)) {
    toWatch.push(config.swaggerDirPath);
}
gulp.task('server', () => nodemon({
    script: './bin/www',
    watch: toWatch,
    ext: 'js yaml',
    ignore: ['build/**'],
    env: {
        DEBUG: 'server:server',
        NODE_PATH: path.resolve(__dirname, 'server'),
        NODE_ENV: 'development'
    }
}));
function runCommand(command) {
    return function (cb) {
        return __awaiter(this, void 0, void 0, function* () {
            yield exec(command, function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                cb(err);
            });
        });
    };
}
gulp.task('mongo', runCommand('mongod --port 27017 --dbpath /Users/briantical/data/db'));
gulp.task('run:dev', gulp.series('mongo', 'server'));
