'use strict';

var _carUtils = require('../utils/car-utils');

var _carData = require('../code-lists/car-data');

describe('appendStringToColor', function () {
  it('should append string to color', function () {
    expect((0, _carUtils.appendStringToColor)('test')(_carData.color)).toEqual({ name: 'My awesome color test' });
  });
  it('should append empty string to color if color not defined', function () {
    expect((0, _carUtils.appendStringToColor)('new')(null)).toEqual({ name: ' new' });
  });
});

describe('appendNewToColor', function () {
  it('should append new to color', function () {
    expect((0, _carUtils.appendNewToColor)(_carData.color)).toEqual({ name: 'My awesome color new' });
  });
});

describe('updateCarColor', function () {
  it('should append new to a cars color', function () {
    expect((0, _carUtils.updateCarColor)(_carUtils.appendNewToColor)(_carData.car)).toEqual(_carData.updatedCar);
  });
  it('should return the original car if invalid', function () {
    expect((0, _carUtils.updateCarColor)(_carUtils.appendNewToColor)(_carData.invalidCar)).toEqual(_carData.invalidCar);
  });
  it('should return the original car if invalid', function () {
    expect((0, _carUtils.updateCarColor)(_carUtils.appendNewToColor)()).toBe(undefined);
  });
  it('should return the original car if invalid', function () {
    expect((0, _carUtils.updateCarColor)()()).toBe(undefined);
  });
  it('should return the original car if missing fn', function () {
    expect((0, _carUtils.updateCarColor)()(_carData.invalidCar)).toBe(_carData.invalidCar);
  });
  it('should return the original car if missing fn', function () {
    expect(function () {
      return (0, _carUtils.updateCarColor)()(_carData.car);
    }).toThrow();
  });
});

describe('updateCarColorWithNew', function () {
  it('should append new to a cars color', function () {
    expect((0, _carUtils.updateCarColorWithNew)(_carData.car)).toEqual(_carData.updatedCar);
  });

  it('should return the original car if invalid', function () {
    expect((0, _carUtils.updateCarColorWithNew)(_carData.invalidCar)).toEqual(_carData.invalidCar);
  });
  it('should return the original car if invalid', function () {
    expect((0, _carUtils.updateCarColorWithNew)()).toBe(undefined);
  });
});

describe('getUpdatedCars', function () {
  it('should update a cars arrays colors with new', function () {
    expect((0, _carUtils.getUpdatedCars)(_carData.carsData, _carUtils.updateCarColorWithNew)).toEqual(_carData.updatedCarsData);
  });
  it('should update a cars arrays colors with new', function () {
    expect((0, _carUtils.getUpdatedCars)(_carData.invalidCarsData, _carUtils.updateCarColorWithNew)).toEqual(_carData.invalidCarsDataResolved);
  });
});