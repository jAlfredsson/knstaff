"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Yup = _interopRequireWildcard(require("yup"));

var LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required()
});

var _default = function _default(req, res, next) {
  return LoginSchema.validate(req.body).then(function () {
    return next();
  })["catch"](function (error) {
    return res.status(422).json((0, _defineProperty2["default"])({}, error.path, error.message));
  });
};

exports["default"] = _default;