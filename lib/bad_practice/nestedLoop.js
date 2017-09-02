export const carsData = [];
for (let i = 0; i < 150; i++) {
  carsData.push({
    company: "honda",
    colors: [
      {
        name: "burntRed",
      },
      {
        name: "springGreen",
      },
      {
        name: "burntRed",
      },
      {
        name: "springGreen",
      },
    ],
  });
}

export const updateCarWithColorBad = (cars) => {
  for (let c = 0; c < cars.length; c++) {

    const car = cars[c];

    for (let i = 0; i < car.colors.length; i++) {
      car.colors[i].name = 'bad ' + car.colors[i].name;
    }
  }
  return cars;
};

export const withMap = (cars) => {
  return cars.map((car) => {
    car.colors = car.colors.map((color) => ({
      name: 'bad ' + color.name,
    }))
  });
};


const appendStringToColor = (string) => (color) => ({ name: `${color.name} ${string}` });
const appendNewToColor = appendStringToColor('good');
const updateCarWithColor = (car) => ({ ...car, colors: car.colors.map(appendNewToColor) });

export const updateCarsColors = (cars) => cars.map(updateCarWithColor);




