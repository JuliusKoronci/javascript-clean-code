'use strict';

var _parseInt = require('./fp/parseInt');

var _parseInt2 = _interopRequireDefault(_parseInt);

var _nestedLoop = require('./bad_practice/nestedLoop');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log((0, _nestedLoop.mapCarColorsToAppendNew)(_nestedLoop.carsData));
console.log((0, _nestedLoop.getUpdatedCars)(_nestedLoop.carsData, _nestedLoop.appendNewToColor));
console.log((0, _nestedLoop.updateCarWithColorBad)(_nestedLoop.carsData));