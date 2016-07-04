var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        './demo/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/',
            include: __dirname
        }
        ]
    }
};
