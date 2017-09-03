export type Color = {
  name: string
};

export type Colors = Array<Color>;
export type Car = {
  company: string,
  colors: Colors
};
export type Cars = Array<Car>;
