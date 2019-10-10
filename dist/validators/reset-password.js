"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Yup = _interopRequireWildcard(require("yup"));

var _User = _interopRequireDefault(require("../models/User"));

var _PasswordReset = _interopRequireDefault(require("../models/PasswordReset"));

var ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(6).required()
});

var _default =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, token, password, existingReset, timeInMinutes, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, token = _req$body.token, password = _req$body.password;
            _context.prev = 1;
            _context.next = 4;
            return ResetPasswordSchema.validate(req.body);

          case 4:
            _context.next = 6;
            return _PasswordReset["default"].findOne({
              token: token
            });

          case 6:
            existingReset = _context.sent;

            if (existingReset) {
              _context.next = 9;
              break;
            }

            throw new Yup.ValidationError('Invalid reset token.', req.body, 'password');

          case 9:
            timeInMinutes = Math.ceil((new Date().getTime() - new Date(existingReset.createdAt).getTime()) / 60000);

            if (!(timeInMinutes > 5)) {
              _context.next = 14;
              break;
            }

            _context.next = 13;
            return _PasswordReset["default"].findOneAndDelete({
              token: token
            });

          case 13:
            throw new Yup.ValidationError('Reset token expired', req.body, 'password');

          case 14:
            _context.next = 16;
            return _User["default"].findOne({
              email: existingReset.email
            });

          case 16:
            user = _context.sent;
            req.user = user;
            return _context.abrupt("return", next());

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](1);
            res.status(422).json((0, _defineProperty2["default"])({}, _context.t0.path, _context.t0.message));

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 21]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;