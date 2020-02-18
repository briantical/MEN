const { spawn, exec } = require("child_process");
const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const gutil = require("gulp-util");
const path = require("path");
const fs = require("fs");
const { config } = require("./config");

const consoleLog = data => gutil.log(data.toString().trim());

const toWatch = ["./src", "./swagger"];

if (fs.existsSync(config.swaggerDirPath)) {
  toWatch.push(config.swaggerDirPath);
}

gulp.task("server", () =>
  nodemon({
    script: "./bin/www",
    watch: toWatch,
    ext: "js yaml",
    ignore: ["build/**"],
    env: {
      DEBUG: "server:server",
      NODE_PATH: path.resolve(__dirname, "server"),
      NODE_ENV: "development"
    }
  })
);

function runCommand(command) {
  return async function(cb) {
    await exec(command, function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  };
}

gulp.task(
  "mongo",
  runCommand(
    "mongod --port 27017 --replSet rscriteria --dbpath /Users/briantical/data/db"
  )
);

gulp.task("run:dev", gulp.series("mongo", "server"));
