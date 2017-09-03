export const carsData = [
  {
    company: "honda",
    colors: [
      {
        name: "burntRed",
      },
      {
        name: "springGreen",
      },
    ],
  },
  {
    company: "ford",
    colors: [
      {
        name: "burntOrange",
      },
      {
        name: "black",
      },
    ],
  },
];

type Colors = Array<{
  name: string
}>;
type Car = {
  company: string,
  colors: Colors
};
type Cars = Array<Car>;


export const updateCarWithColorBad = (cars) => {
  for (let c = 0; c < cars.length; c++) {

    const car = cars[c];

    for (let i = 0; i < car.colors.length; i++) {
      car.colors[i].name = 'bad ' + car.colors[i].name;
    }
  }
  return cars;
};

export const mapCarColorsToAppendNew = (cars) => {
  return cars.map((car) => {
    return {
      ...car,
      colors: car.colors.map((color) => ({
        name: 'map ' + color.name,
      })),
    };
  });
};


export const appendStringToColor = (string) => (color) => ({ name: `${color.name} ${string}` });
export const appendNewToColor = appendStringToColor('good');

export const updateCarColor = (updateFn) => (car) => {
  // we just want to return whatever is passed in and let application handle the incorrect car
  if (!car || !car.colors) {
    return car;
  }

  return { ...car, colors: car.colors.map(updateFn) };
};

export const updateCarColorWithNew = updateCarColor(appendNewToColor);

/**
 * Use this function to get a new array of cars with updated values,
 * you can pass in any function which is able to convert a car object
 *
 * @param {Array} cars - an array of car [{company: [string], cars: [[{name: [string]}]]}]
 * @param {Function} updateFn - a function which converts a Car to a new desired format
 *
 * @returns {Array} - returns an Array of cars with same length but transformed content
 */
export const getUpdatedCars = (cars: Cars, updateFn: (car: Car) => Car): Cars => cars.map(updateFn);

