'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var appendStringToColor = exports.appendStringToColor = function appendStringToColor(string) {
  return function (color) {
    return { name: (color ? color.name : '') + ' ' + string };
  };
};
var appendNewToColor = exports.appendNewToColor = appendStringToColor('new');

var updateCarColor = exports.updateCarColor = function updateCarColor(updateFn) {
  return function (car) {
    // we just want to return whatever is passed in and let application handle the incorrect car
    if (!car || !car.colors) {
      return car;
    }

    return _extends({}, car, { colors: car.colors.map(updateFn) });
  };
};

var updateCarColorWithNew = exports.updateCarColorWithNew = updateCarColor(appendNewToColor);

/**
 * Use this function to get a new array of cars with updated values,
 * you can pass in any function which is able to convert a car object
 *
 * @param {Array} cars - an array of car [{company: [string], cars: [[{name: [string]}]]}]
 * @param {Function} updateFn - a function which converts a Car to a new desired format
 *
 * @returns {Array} - returns an Array of cars with same length but transformed content
 */
var getUpdatedCars = exports.getUpdatedCars = function getUpdatedCars(cars, updateFn) {
  return cars.map(updateFn);
};