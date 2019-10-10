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

var ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required()
});

var _default =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var email, user, existingReset, timeInMinutes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = req.body.email;
            _context.prev = 1;
            _context.next = 4;
            return ForgotPasswordSchema.validate(req.body);

          case 4:
            _context.next = 6;
            return _User["default"].findOne({
              email: email
            });

          case 6:
            user = _context.sent;

            if (user) {
              _context.next = 9;
              break;
            }

            throw new Yup.ValidationError('This user does not exist.', req.body, 'email');

          case 9:
            _context.next = 11;
            return _PasswordReset["default"].findOne({
              email: email
            });

          case 11:
            existingReset = _context.sent;

            if (!existingReset) {
              _context.next = 20;
              break;
            }

            timeInMinutes = Math.ceil((new Date().getTime() - new Date(existingReset.createdAt).getTime()) / 60000);

            if (!(timeInMinutes > 5)) {
              _context.next = 19;
              break;
            }

            _context.next = 17;
            return existingReset.remove();

          case 17:
            _context.next = 20;
            break;

          case 19:
            throw new Yup.ValidationError('Password reset link already sent.', req.body, 'email');

          case 20:
            req.user = user;
            return _context.abrupt("return", next());

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](1);
            res.status(422).json((0, _defineProperty2["default"])({}, _context.t0.path, _context.t0.message));

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 24]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;