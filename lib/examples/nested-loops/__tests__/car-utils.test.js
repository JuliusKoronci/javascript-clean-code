import {
  appendStringToColor,
  appendNewToColor,
  updateCarColor,
  updateCarColorWithNew,
  getUpdatedCars,
} from '../utils/car-utils';
import { carsData, updatedCar, color, car, updatedCarsData, invalidCar, invalidCarsData, invalidCarsDataResolved } from "../code-lists/car-data";

describe('appendStringToColor', () => {
  it('should append string to color', () => {
    expect(appendStringToColor('test')(color)).toEqual({ name: 'My awesome color test' });
  });
  it('should append empty string to color if color not defined', () => {
    expect(appendStringToColor('new')(null)).toEqual({ name: ' new' });
  });
});

describe('appendNewToColor', () => {
  it('should append new to color', () => {
    expect(appendNewToColor(color)).toEqual({ name: 'My awesome color new' });
  });
});

describe('updateCarColor', () => {
  it('should append new to a cars color', () => {
    expect(updateCarColor(appendNewToColor)(car)).toEqual(updatedCar);
  });
  it('should return the original car if invalid', () => {
    expect(updateCarColor(appendNewToColor)(invalidCar)).toEqual(invalidCar);
  });
  it('should return the original car if invalid', () => {
    expect(updateCarColor(appendNewToColor)()).toBe(undefined);
  });
  it('should return the original car if invalid', () => {
    expect(updateCarColor()()).toBe(undefined);
  });
  it('should return the original car if missing fn', () => {
    expect(updateCarColor()(invalidCar)).toBe(invalidCar);
  });
  it('should return the original car if missing fn', () => {
    expect(() => updateCarColor()(car)).toThrow();
  });
});

describe('updateCarColorWithNew', () => {
  it('should append new to a cars color', () => {
    expect(updateCarColorWithNew(car)).toEqual(updatedCar);
  });

  it('should return the original car if invalid', () => {
    expect(updateCarColorWithNew(invalidCar)).toEqual(invalidCar);
  });
  it('should return the original car if invalid', () => {
    expect(updateCarColorWithNew()).toBe(undefined);
  });
});

describe('getUpdatedCars', () => {
  it('should update a cars arrays colors with new', () => {
    expect(getUpdatedCars(carsData, updateCarColorWithNew)).toEqual(updatedCarsData)
  });
  it('should update a cars arrays colors with new', () => {
    expect(getUpdatedCars(invalidCarsData, updateCarColorWithNew)).toEqual(invalidCarsDataResolved)
  });
});

