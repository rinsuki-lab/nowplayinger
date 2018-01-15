const path = require("path")

module.exports = {
    entry: "./src/client/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist/client/webpack"),
        libraryTarget: "commonjs2",
        publicPath: "webpack/",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.css?$/, loader: "style-loader!css-loader"},
            { test: /\.(svg|ttf|otf|eot|woff2?)$/, loader: "file-loader"},
        ]
    },
    externals: [{
        "itunes-nowplaying-mac": "itunes-nowplaying-mac",
        "crypto": "crypto",
        "electron": "electron",
    }]
}