"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _randomstring = _interopRequireDefault(require("randomstring"));

var _mail = _interopRequireDefault(require("@fullstackjs/mail"));

var _PasswordReset = _interopRequireDefault(require("./PasswordReset"));

var UserSchema = new _mongoose["default"].Schema({
  name: String,
  email: String,
  createdAt: Date,
  updatedAt: Date,
  password: String,
  emailConfirmedAt: Date,
  emailConfirmCode: String
});
UserSchema.pre('save', function () {
  this.password = _bcryptjs["default"].hashSync(this.password);
  this.emailConfirmCode = _randomstring["default"].generate(72);
  this.createdAt = new Date();
});
UserSchema.post('save',
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return this.sendEmailConfirmation();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));

UserSchema.methods.generateToken = function () {
  return _jsonwebtoken["default"].sign({
    id: this._id
  }, _config["default"].jwtSecret);
};

UserSchema.methods.comparePasswords = function (plainPassword) {
  return _bcryptjs["default"].compareSync(plainPassword, this.password);
};

UserSchema.methods.forgotPassword =
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee2() {
  var token;
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = _randomstring["default"].generate(72);
          _context2.next = 3;
          return _PasswordReset["default"].create({
            token: token,
            email: this.email,
            createdAt: new Date()
          });

        case 3:
          _context2.next = 5;
          return new _mail["default"]('forgot-password').to(this.email, this.name).subject('Password reset').data({
            url: "".concat(_config["default"].url, "/auth/passwords/reset/").concat(token),
            name: this.name
          }).send();

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));
UserSchema.methods.sendEmailConfirmation =
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee3() {
  return _regenerator["default"].wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return new _mail["default"]('confirm-account').to(this.email, this.name).subject('Please confirm your account').data({
            name: this.name,
            url: "".concat(_config["default"].url, "/auth/emails/confirm/").concat(this.emailConfirmCode)
          }).send();

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
}));

var _default = _mongoose["default"].model('User', UserSchema);

exports["default"] = _default;