"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var carsData = exports.carsData = [];
for (var i = 0; i < 150; i++) {
  carsData.push({
    company: "honda",
    colors: [{
      name: "burntRed"
    }, {
      name: "springGreen"
    }, {
      name: "burntRed"
    }, {
      name: "springGreen"
    }]
  });
}

var updateCarWithColorBad = exports.updateCarWithColorBad = function updateCarWithColorBad(cars) {
  for (var c = 0; c < cars.length; c++) {

    var car = cars[c];

    for (var _i = 0; _i < car.colors.length; _i++) {
      car.colors[_i].name = 'bad ' + car.colors[_i].name;
    }
  }
  return cars;
};

var withMap = exports.withMap = function withMap(cars) {
  return cars.map(function (car, i) {
    car.colors = car.colors.map(function (color, i) {
      {
        name: 'bad ' + color.name;
      }
    });

    return car;
  });
};

var appendStringToColor = function appendStringToColor(string) {
  return function (color) {
    return { name: color.name + " " + string };
  };
};
var appendNewToColor = appendStringToColor('good');
var updateCarWithColor = function updateCarWithColor(car) {
  return _extends({}, car, { colors: car.colors.map(appendNewToColor) });
};
var updateCarsColors = exports.updateCarsColors = function updateCarsColors(cars) {
  return cars.map(updateCarWithColor);
};