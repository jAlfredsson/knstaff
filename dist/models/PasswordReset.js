"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("../config"));

var _randomstring = _interopRequireDefault(require("randomstring"));

var _mail = _interopRequireDefault(require("@fullstackjs/mail"));

var PasswordResetSchema = new _mongoose["default"].Schema({
  email: String,
  token: String,
  createdAt: Date
});

var _default = _mongoose["default"].model('PasswordReset', PasswordResetSchema);

exports["default"] = _default;