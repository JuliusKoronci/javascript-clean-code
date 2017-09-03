// @flow
import type { Cars, Car, Color } from './flow-types/car-types';

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
export const mapCarColorsToAppendNew = (cars: Cars): Cars => {
  return cars.map((car: Car) => {
    return {
      ...car,
      colors: car.colors.map((color: Color) => ({
        name: 'map ' + color.name,
      })),
    };
  });
};

/**
 * For usage see tests
 *
 * getUpdatedCars(cars, updateCarColorWithNew);
 */




