"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/stable");

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _config = _interopRequireDefault(require("./config"));

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireDefault(require("./routes"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpack2 = _interopRequireDefault(require("../webpack.config"));

var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

_mongoose["default"].connect(_config["default"].databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
var compiler = (0, _webpack["default"])(_webpack2["default"]);
app.use((0, _webpackDevMiddleware["default"])(compiler, {
  hot: true,
  publicPath: _webpack2["default"].output.publicPath
}));
app.use((0, _webpackHotMiddleware["default"])(compiler));
app.use(_routes["default"]);
app.use(_express["default"]["static"](_path["default"].resolve(__dirname, 'public')));
app.get('*', function (req, res) {
  res.sendFile(_path["default"].resolve(__dirname, 'public/index.html'));
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server started on port ".concat(port));
});