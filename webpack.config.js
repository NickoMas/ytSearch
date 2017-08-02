module.exports = {
    entry: "./js/index.js",
    output: {
        filename: "./bundle.js"
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["es2015"]
                }
            },
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            }
        ]
    }
}