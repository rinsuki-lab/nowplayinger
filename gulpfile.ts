import * as gulp from "gulp"
import * as ts from "gulp-typescript"
import { execSync } from "child_process";
import * as webpackStream from "webpack-stream"

const tsProject = ts.createProject("tsconfig.json")

gulp.task("compile:ts", () => {
    return gulp.src(["src/**/*.{ts,tsx}", "!src/client/**/*"])
        .pipe(tsProject())
        .pipe(gulp.dest("dist/"))
})

gulp.task("compile:webpack", () => {
    return webpackStream(require("./webpack.config"))
        .pipe(gulp.dest("dist/client/webpack/"))
})

gulp.task("compile", ["compile:ts", "compile:webpack"], () => {})

gulp.task("copy", () => {
    return gulp.src("src/**/*.{html,svg}")
        .pipe(gulp.dest("dist/"))
})

gulp.task("build", ["compile", "copy"], () => {})

gulp.task("run", ["build"], () => {
    execSync("./node_modules/.bin/electron .")
})

gulp.task("default", ["build"], () => {})