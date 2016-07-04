const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const host = 'localhost';
const port = 3000;

new webpackDevServer(webpack(config), {
  publicPath: config.output.publicPath
}).listen(port, host, function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening http://' + host + ':' + port);
});
