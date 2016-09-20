var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: './public/bundle.js',
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel-loader", query: { presets: ['es2015', 'react'] } }
        ]
    },
    devtool: 'source-map'
};
