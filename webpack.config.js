const path = require("path")

module.exports = {
    entry: "./src/client/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist/client/webpack"),
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
        ]
    },
    externals: [{
        "itunes-nowplaying-mac": "itunes-nowplaying-mac"
    }]
}