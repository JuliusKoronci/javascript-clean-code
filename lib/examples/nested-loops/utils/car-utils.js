// @flow
import type { Cars, Car, Colors, Color } from '../flow-types/car-types';

export const appendStringToColor = (string: string) => (color: Color): Color => ({ name: `${color ? color.name : ''} ${string}` });
export const appendNewToColor: (color: Color) => Color = appendStringToColor('new');

export const updateCarColor = (updateFn: (color: Color) => Color) => (car: Car): Car => {
  // we just want to return whatever is passed in and let application handle the incorrect car
  if (!car || !car.colors) {
    return car;
  }

  return { ...car, colors: car.colors.map(updateFn) };
};

export const updateCarColorWithNew: (car: Car) => Car = updateCarColor(appendNewToColor);

type UpdateCarFn = (car: Car) => Car;

/**
 * Use this function to get a new array of cars with updated values,
 * you can pass in any function which is able to convert a car object
 *
 * @param {Array} cars - an array of cars [{company: [string], cars: [[{name: [string]}]]}]
 * @param {Function} updateCarFn - a function which converts a Car to a new desired format
 *
 * @returns {Array} - returns an Array of cars with same length but transformed content
 */
export const getUpdatedCars: GetUpdatedCars = (cars, updateCarFn: UpdateCarFn): Cars => cars.map(updateFn);
