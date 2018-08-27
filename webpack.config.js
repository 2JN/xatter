const path = require('path')

module.exports = {
  entry: './components/Guard/index.js',
  output: {
    path: path.join(__dirname, 'public', 'javascripts'),
    filename: 'guard.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
    ]
  }
}
