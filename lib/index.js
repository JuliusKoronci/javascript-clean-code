import parseIntTest from './fp/parseInt';
import {
  getUpdatedCars,
  appendNewToColor,
  updateCarWithColorBad,
  carsData,
  mapCarColorsToAppendNew,
} from './bad_practice/nestedLoop';

console.log(mapCarColorsToAppendNew(carsData));
console.log(getUpdatedCars(carsData, appendNewToColor));
console.log(updateCarWithColorBad(carsData));

