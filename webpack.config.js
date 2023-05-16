const path = require("path");

module.exports = {
  entry: {
    login: './public/javascript/login.js',
    event:'./public/javascript/delete-event.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
    path: __dirname + "/dist"
  },

  mode: 'development'
};
