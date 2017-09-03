'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//  Example bad code
//
//  for (let c = 0; c < cars.length; c++) {
//
//    const car = cars[c];
//
//    for (let i = 0; i < car.colors.length; i++) {
//      car.colors[i].name = 'bad ' + car.colors[i].name;
//    }
//  }
//  return cars;

/**
 * 1. Optimisation
 *
 * Append string to all car's colors
 *
 * @param {Array} cars - an array of car [{company: [string], cars: [[{name: [string]}]]}]
 * @returns {Array} - returns an Array of cars with same length but transformed content
 */
var mapCarColorsToAppendNew = exports.mapCarColorsToAppendNew = function mapCarColorsToAppendNew(cars) {
  return cars.map(function (car) {
    return _extends({}, car, {
      colors: car.colors.map(function (color) {
        return {
          name: 'map ' + color.name
        };
      })
    });
  });
};

/**
 * For usage see tests
 *
 * getUpdatedCars(cars, updateCarColorWithNew);
 */