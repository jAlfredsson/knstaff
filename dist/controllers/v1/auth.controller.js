"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../../models/User"));

var _PasswordReset = _interopRequireDefault(require("../../models/PasswordReset"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _axios = _interopRequireDefault(require("axios"));

var login =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, user, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 3;
            return _User["default"].findOne({
              email: email
            });

          case 3:
            user = _context.sent;

            if (!user) {
              _context.next = 9;
              break;
            }

            if (!user.comparePasswords(password)) {
              _context.next = 9;
              break;
            }

            console.log('201 login success');
            token = user.generateToken();
            return _context.abrupt("return", res.status(201).json({
              user: user,
              token: token
            }));

          case 9:
            console.log('400 login failure');
            return _context.abrupt("return", res.status(400).json({
              email: 'These credentials does not match'
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var register =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, name, email, password, user, token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password;
            _context2.next = 3;
            return _User["default"].create({
              name: name,
              email: email,
              password: password
            });

          case 3:
            user = _context2.sent;
            token = user.generateToken();
            return _context2.abrupt("return", res.status(201).json({
              user: user,
              token: token
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function register(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var forgotPassword =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return req.user.forgotPassword();

          case 2:
            return _context3.abrupt("return", res.json({
              message: 'Password reset link set'
            }));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function forgotPassword(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var resetPassword =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            user = req.user;
            _context4.next = 3;
            return _User["default"].findOneAndUpdate({
              email: user.email
            }, {
              password: _bcryptjs["default"].hashSync(req.body.password)
            });

          case 3:
            _context4.next = 5;
            return _PasswordReset["default"].findOneAndDelete({
              email: user.email
            });

          case 5:
            return _context4.abrupt("return", res.json({
              message: 'Password reset successful'
            }));

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function resetPassword(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var emailConfirm =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var user, token;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _User["default"].findOneAndUpdate({
              email: req.user.email
            }, {
              emailConfirmedAt: new Date(),
              emailConfirmCode: null
            }, {
              "new": true
            });

          case 2:
            user = _context5.sent;
            token = user.generateToken();
            return _context5.abrupt("return", res.json({
              user: user,
              token: token
            }));

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function emailConfirm(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var resendEmailConfirm =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(req, res) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (req.user.emailConfirmedAt) {
              _context6.next = 3;
              break;
            }

            _context6.next = 3;
            return req.user.sendEmailConfirmation();

          case 3:
            return _context6.abrupt("return", res.json({
              message: 'Email confirm sent.' //Detta är väl egentligen inte riktigt??

            }));

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function resendEmailConfirm(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var offers =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(req, res) {
    var time, gigs;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            time = new Date().getTime(); // return res.status(401).json({})

            _context7.prev = 1;
            _context7.next = 4;
            return _axios["default"].post('https://script.google.com/macros/s/AKfycbzPXYMpHP3KKPP-vroYaUBav_8Px5yZ3FTAb1lOlcLfGWTt5Q/exec', {
              test: true
            });

          case 4:
            gigs = _context7.sent;
            console.log('time ->', (new Date().getTime() - time) / 1000);
            return _context7.abrupt("return", res.status(201).json([{
              name: gigs.data
            }]));

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](1);
            return _context7.abrupt("return", res.status(201).json([{
              name: 'Britney'
            }]));

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 9]]);
  }));

  return function offers(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var _default = {
  offers: offers,
  login: login,
  register: register,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  emailConfirm: emailConfirm,
  resendEmailConfirm: resendEmailConfirm
};
exports["default"] = _default;