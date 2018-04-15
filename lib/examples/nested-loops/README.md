# The nested evil for loop

In this article we'll have a look at a practical example that I came across on stackoverflow and try to refactor and improve upon it. It's a real world example
which looks perfectly fine, but doesn't meet some basic requirements to be considered "Good quality code". Let's begin by having a look at the code below:

```javascript 
const cars = [
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

for (let c = 0; c < cars.length; c++) {

  let car = cars[c];

  for (let i = 0; i < car.colors.length; i++) {
    car.colors[i].name = 'new ' + car.colors[i].name;
  }
}
```

So what is wrong with this code? Quite a lot actually, here's a list of rules that the code above breaks but ideally should follow.

## Rules
1. Functions should us a maximum 1 level of nesting
2. We should always avoid the use of the <b>let</b> keyword
3. We should not mutate data
4. Functions should have doc blocks accompanying the code
5. We should use some way of type checking e.g. JSDOC, Flow, TypeScript
6. We should always use ES6 constructs where possible (foreach instead of for)

We can also say that the above example is a very bad approach because it is hard to read and reason about. The code is not easy to test
and misses documentation. We can clearly see what the code does but we need to examine it and spend time to understand the intent of the author.

This is the moment where some seasoned developers will say "But nested for loops are a perfectly valid approach" and these developers are correct as far as Javascript goes. But the thing is, we are not only javascript 
developers but also software engineers. We need to think about the future, about maintainability, testability and working in a team.

In my career, so far, I have seen many brilliant developers produce highly technical, advanced looking, futuristic code which went straight into the bin, because no one was able to work with it, change it or understand it after 2 weeks.

What we strive for, is code where it is immediately clear what the intent of the author was. We strive for easily maintainable code, so that when a new requirement arrives, we can just change a small part of the code, run a test and 
be assured that nothing breaks.

##### Examining the code

In the first step, let's address the biggest issue of the code sample. I would even go as far as to call it a bug. As you may have guessed it is a violation of rule number 3. To be honest, I didn't see the bug until I started to rewrite the code 🙂

Before we start to refactor, let's make sure we understand what the code does:
The functionality is actually extremely simple. We have an array of cars and we are prepending the word "new" to each color name of colors in the array. So 'burntRed' would become 'new burntRed' etc.

One of the first questions, which comes to mind is

> What will happen, if later on, in the app I will need an array of cars, where instead of the word "new" I would need to prepend the word "old"?

With the current approach, we would create another nested for loop, and do the same just with a different word. If we ignore [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), [SRP](https://en.wikipedia.org/wiki/Single_responsibility_principle) and [SOLID](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)) principles for now and go forward with this idea, will it work?

As you may have guessed, it will not work and what happens is that instead of the the word "old" we will have the word "old new ". 
Now the only reason for that is because we mutated the original Array in our first for loop. This is because in Javascript, when you assign an object to a variable, in the memory, it is just a reference to the original object you assigned.

I hope that you are convinced by now, that while the code sample is a perfectly valid approach, it shouldn't really be part of an existing application and we can move on to optimising and refactoring it.

### Addressing rules 2, 3, 6 with a rewrite approach

It is actually very simple to address these rules and our approach will consist of converting the for loops into a simple reusable function:

```javascript
const mapCarColorsToPrependNew = (cars) => {
  return cars.map((car) => {
    return {
      ...car,
      colors: car.colors.map((color) => ({
        name: 'new ' + color.name,
      })),
    };
  });
};
```

This piece of code looks more modern, doesn't use the for loops, doesn't mutate data. But it still uses nested loops and is hard to read and understand. It is not really reusable and if we want to add something else to the colors we 
will need to create a copy of the function.

### Addressing all rules with a declarative approach of what we want to achieve

Let's start by identifying the purpose of the code, what is it that we want to achieve, what is our intent? 

We have an array of cars and we would like to be able to get a new array where the data of the cars is updated while not breaking any best practice rules we have set up.

####Our first step is creating a function named by our intent:

```javascript 
function getUpdatedCars (...) {...}
```

Our second step is to identify the arguments/parameters. Obviously the functions first argument should be an array of cars and since we want to prepend a new word to the colors, it makes sense to have this word as the second argument:

```javascript 
function getUpdatedCars (cars, wordToPrepend) {...}
```

This is the perfect time to stop and think about the bigger picture. What if I want to do something else then prepend, is this function reusable and clean enough? Is this thinking a premature optimisation?

> Our hidden goal is to build up a habit of writing good quality code. If this becomes our habit, we will follow best practices by default and it will never be premature optimisation. Anyway, writing spaghetti code can never be justified by premature optimisation :)

Let's revise our solution by becoming a bit functional. 

> "Oh crap another functional guy!" - But don't worry, I'm not that functional 🙂

### My idea of the solution is as follows:

What if I have a cars array and I could run any kind of transformation function on it in order to get an updated cars array? I could have a little utility library with all the transformation functions I will ever need and I can slowly create more when the need arises. Let's be [SOLID](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)), [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), let's follow [SRP](https://en.wikipedia.org/wiki/Single_responsibility_principle) and [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it).

> Yes, design patterns are an important knowledge of every seasoned developer :)

But back to the code:

```javascript
const getUpdatedCars = (cars, transformCars) => cars.map(transformCars);
```

We have done a few things here:

1. We created a very descriptive function, where it is very clear what it does
2. We shifted the responsibility of the actual transformation to an external function
3. We used a function expression to make the code more clean and readable

Even without flow or documentation, it is quite easy to understand what the function does and the next steps become 
very evident.

#### Time to create our transformation function and explain our reasoning behind.

Our intent is to create a function which will update the colors of a car with whatever we want.

```javascript 
const updateCarColor = (updateFn) => (car) => (...);
```
We follow the same functional reasoning as before. We created a curried function for two reasons:

1. We want to create composable functions
2. We want to be able to pass the function into map

Here are our partially applied functions, which will work with our cars loop:

```javascript 
const prependText = updateCarColor(prependTextFn);
const appendText = updateCarColor(appendTextFn);
```

This is the point where we need to stop and think a little 'YAGNI'. We need to think about the level of abstraction we want. 

Many hardcore functional programmers will break down everything to such a level of abstraction that their code at the end looses all benefits of readability and maintainability. It becomes easier to just create a new solution than 
reuse the existing functions.

> YAGNI - You aren't gonna need it

Let's return back to our intents here for a second. We are supposed to be able to prepend or append any kind of text and that should do for now. Since we have broken down our initial solution to small, reusable and replaceable functions, we can very
easily create a different solution, if the need arises and just refactor and replace what we have so far without worrying 
much about breaking the code.

To sum up the next step. We want to be able to map trough the colors array of the car and be able to apply any transformation function on each color of a car.


```javascript 
const updateCarColor = (transformCarColor) => (car) => ({ ...car, colors: car.colors.map(transformCarColor) });
```

The only step missing is the actual transformCarColor function.

```javascript 
const prependStringToColor = (string) => (color) => ({ name: `${color.name} ${string}` });
const prependNewToColor = prependStringToColor('new');
```

We now have a function which accepts a color and prepends the word new to it.
What would our solution look like in a real project?

```javascript
import {
  getUpdatedCars,
  prependNewToColor,
} from './bad_practice/car-utils';

getUpdatedCars(carsData, prependNewToColor);
```

We abstracted all the functions to a utils file and use only what we need. It is clear what the function does, although we could work on the naming :) , our solution is declarative and reusable. It is easy to test, easy to change, easy to extend. All the functions we created so far are following SRP, they have only one responsibility, they do only one thing. We can easily combine them and compose more complex solutions.

All of the functions are pure and writing a test is just saying this goes in and I expect that coming out.

### Flow, documentation and what we missed

So are we ready yet? No, not really :)
So far we followed the happy path approach.
 
> Happy path is actually a design principle I follow while programming, it works really well with Demeter's law

We didn't really deal with exceptions. So what can go wrong here?
 
Before answering, we are going to write some flow types. Writing the types should make the errors clear:

```javascript 
type Colors = Array<{
  name: string
}>;

type Car = {
  company: string,
  colors: Colors
};

type Cars = Array<Car>;
```
Looking at the flow types, neither our solution or the original solution is dealing with cases, where the car has a 
different structure than we just defined. 

The advantage of using flow here is, that we have a chance to be notified about defects by the flow server.
Of course, test coverage will also be helpful in detecting edge cases we forgot to cover.

By releasing this solution, we are introducing a random hard to track error every time our API returns cars without
colors and causes a really unpleasant experience for our customers.

Thanks to our refactoring, there is only 2 places where our application can break, so let's fix them:

```javascript 
const prependStringToColor = (string) => (color) => ({ name: `${color ? color.name: ''} ${string}` });

const updateCarColor = (updateFn) => (car) => {
  // we just want to return whatever is passed in and let application handle the incorrect car
  if (!car || !car.colors) {
    return car;
  }

  return { ...car, colors: car.colors.map(updateFn) };
};
```
If we call <b>color.name</b> and "color" is undefined, we get an error. The same goes for <b>car.colors</b>.

The exception handling here is not the best but proves the point for the article. To be honest I prefer to throw Errors and handle them in a try catch, but this really depends on the application and the developer's approach. 

Even if we didn't cover every error, once they appear, they will be very specific and we will know exactly the function where it happened and how to fix it.

> We have small simple functions therefore errors are easy to find and easy to fix

I will leave the complete flow coverage and documentation for another article. I believe the functions are easy to grasp, even without a docblock. The only function which really needs a docblock is the getUpdatedCars. As you can see, naming functions in a way so that everyone can understand your intent is really hard and documentation can help here a lot.

```javascript 

type UpdateCarFn = (car: Car) => Car;

/**
 * Use this function to get a new array of cars with updated values,
 * you can pass in any function which is able to convert a car object
 *
 * @param {Array} cars - an Array of cars [{company: [string], cars: [[{name: [string]}]]}]
 * @param {Function} updateCarFn - a function which converts a Car to a new desired format
 *
 * @returns {Array} - returns an Array of cars with same length but transformed content
 */
export const getUpdatedCars: GetUpdatedCars = (cars, updateCarFn: UpdateCarFn): Cars => cars.map(updateFn);

```

### Conclusion

What to take away from this article? Best practices have their meaning, but when people don't see the bigger picture and lack the required knowledge, they see almost no meaning in writing better code. Writing good quality code should be a habit, I would write the nested for loops directly the way we wrote the final solution. It would take me almost the same amount of time. Writing good code is not premature optimisation and even though it can take slightly more time and following the best practice rules is sometimes a pain in the ***, it will pay off in the long term. Your code will have less bugs and even if a bug is discovered in the future, it will be easy to fix.

We have a GITHUB repo where we started to gather code we think can be improved, 
it will have the final code with tests, flow types and explanations. Everyone is 
welcome to contribute and open discussions. 

The solution presented above is not the only way, or the best way of doing it, but it definitely is my take on the nested for loops and I am more than happy to discuss the good or bad parts of my solution 🙂
