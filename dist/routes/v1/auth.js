"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../../controllers/v1/auth.controller"));

var _register = _interopRequireDefault(require("../../validators/register"));

var _login = _interopRequireDefault(require("../../validators/login"));

var _forgotPassword = _interopRequireDefault(require("../../validators/forgot-password"));

var _resetPassword = _interopRequireDefault(require("../../validators/reset-password"));

var _emailConfirm = _interopRequireDefault(require("../../validators/email-confirm"));

var _auth2 = _interopRequireDefault(require("../../middleware/auth"));

var authRouter = new _express.Router();
authRouter.post('/login', _login["default"], _auth["default"].login);
authRouter.post('/register', _register["default"], _auth["default"].register);
authRouter.post('/email/confirm', _emailConfirm["default"], _auth["default"].emailConfirm);
authRouter.post('/email/resendConfirm', _auth2["default"], _auth["default"].resendEmailConfirm);
authRouter.post('/offers', _auth2["default"], _auth["default"].offers);
authRouter.post('/passwords/email', _forgotPassword["default"], _auth["default"].forgotPassword);
authRouter.post('/passwords/reset', _resetPassword["default"], _auth["default"].resetPassword);
var _default = authRouter;
exports["default"] = _default;