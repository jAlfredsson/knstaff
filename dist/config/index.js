"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var _default = {
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/mevnmongo',
  url: process.env.APP_URL || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET || '1234'
};
exports["default"] = _default;