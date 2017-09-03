"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var carsData = exports.carsData = [{
  company: "honda",
  colors: [{
    name: "burntRed"
  }, {
    name: "springGreen"
  }]
}, {
  company: "ford",
  colors: [{
    name: "burntOrange"
  }, {
    name: "black"
  }]
}];

var updatedCarsData = exports.updatedCarsData = [{
  company: "honda",
  colors: [{
    name: "burntRed new"
  }, {
    name: "springGreen new"
  }]
}, {
  company: "ford",
  colors: [{
    name: "burntOrange new"
  }, {
    name: "black new"
  }]
}];

var invalidCarsData = exports.invalidCarsData = [{
  company: "honda"
}, {
  company: "ford",
  colors: [{
    name: "burntOrange"
  }, {
    name: "black"
  }]
}];
var invalidCarsDataResolved = exports.invalidCarsDataResolved = [{
  company: "honda"
}, {
  company: "ford",
  colors: [{
    name: "burntOrange new"
  }, {
    name: "black new"
  }]
}];

var color = exports.color = { name: 'My awesome color' };

var car = exports.car = {
  company: "honda",
  colors: [{
    name: "burntRed"
  }, {
    name: "springGreen"
  }]
};
var invalidCar = exports.invalidCar = {
  company: "honda"
};
var updatedCar = exports.updatedCar = {
  colors: [{
    name: "burntRed new"
  }, {
    name: "springGreen new"
  }],
  company: "honda"
};