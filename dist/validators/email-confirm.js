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

var EmailConfirmSchema = Yup.object().shape({
  token: Yup.string().required()
});

var _default =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            console.log(req.body);
            _context.next = 4;
            return EmailConfirmSchema.validate(req.body);

          case 4:
            _context.next = 6;
            return _User["default"].findOne({
              emailConfirmCode: req.body.token
            });

          case 6:
            user = _context.sent;

            if (user) {
              _context.next = 9;
              break;
            }

            throw new Yup.ValidationError('Invalid confirmation code', req.body, 'token');

          case 9:
            req.user = user;
            return _context.abrupt("return", next());

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            res.status(422).json((0, _defineProperty2["default"])({}, _context.t0.path, _context.t0.message));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;