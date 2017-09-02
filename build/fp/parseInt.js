'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  console.log(['10', '10', '10', '10'].map(parseInt));
  console.log(_ramda2.default.map(parseInt)(['10', '10', '10', '10']));
};