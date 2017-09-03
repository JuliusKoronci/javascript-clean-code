# The nested evil for loop

In this article we will have a look at a practical example, I came across on stackoverflow. It is a real world example
which looks perfectly fine but doesn't meet a few of our requirements for "Good quality code". Lets have a look at the 
code:

``` 
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
    car.color[i].name += 'new ' + car.color[i].name;
  }
}
```

So whats wrong with this code? Lets see first the violations:

1. Maximum 1 level of nesting
2. Avoid the use of the <b>let</b> keyword
3. Don't mutate data
4. Document your code
5. Use type checking e.g. JSDOC, Flow, TypeScript
6. Prefer ES6 constructs (foreach instead of for)

We can also say that this is a very imperative approach, hard to read and reason about. The code is not easy to test
and misses documentation whatsoever. We can clearly see what the code does but we need to examine it and spend 
brain power to understand the intent of the author.

This is the moment where every picky developer will say "wth nested for loops are a perfectly valid approach" and 
these developers are correct as far as Javascript goes. The thing is, that we are not only javascript 
developers but also software architects. We need to think about the future, about maintainability, testability 
and team work. 

In my career I have seen many brilliant developers produce highly technical, advanced code looking 
like from the future which went straight into the trash, because no one was able to work with it, change it or understand 
it after 2 weeks time. 

What we strive for, is code where it is immediately clear what the intent of the author was. We strive for easily 
maintainable code, so that when a new requirement arrives, we can just change a small part of the code, run a test and 
be assured that nothing breaks.

##### Examining the code

In the first step, let's address the biggest issue of the code sample. I would even call it a bug. As everyone 
guessed it is a violation of rule number 3. TBH, I didn't see the bug until I started to rewrite the code :)

Before we start anything, let's make sure we know what the code does:
We have a cars array and we are pretending the word "new" to the colors in the array. This is all the code does. 

One of the first questions, which come to mind is: what will happen, if later or, in the app I will need an array of 
the cars, where instead of the word "new" I would need to prepend the word "old". With the current approach, we would 
create another nested for loop, and do the same just with a different word. 
If we ignore DRY, SRP and SOLID principles for now and go forward with this idea, will it work?

As you guessed, it will not work and what happens is, that instead of the the word "old" we will have the word "old new ". 
The only reason for that is, that we have changed the original Array in our first for loop.

I hope everyone is convinced by now, that while the code sample is perfectly valid, it shouldn't really be part of an 
existing application and we can move onto optimising and rewriting it.

### Addressing rules 2, 3, 6 with a rewrite approach

It is actually very simple to address these rules and our approach will consist of converting the for loops into a 
simple reusable function:

```
const mapCarColorsToAppendNew = (cars) => {
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
This piece of code looks more modern, doesn't use the for loops, doesn't mutate data. But it still uses nested loops 
and is hard to read and understand. It is not really reusable and if we want to add something else to the colors we 
will need to create a copy of the function.

### Addressing all rules with a declarative approach of what we want to achieve

Lets start by identifying the purpose of the code, what is it we want to achieve, what is our intent? 

We have an array of cars and we would like to be able to get a new array where the data of the cars is updated while 
not breaking any best practice rules we have set up.

<b>Our first step is creating a function named by our intent:</b>

``` 
function getUpdatedCars(...){...}
```

Our second step is to identify the arguments/parameters. Obviously the functions first argument should be an array of 
cars and since we want to prepend a new word to the colors, it makes sense to have this word as the second argument:

``` 
function getUpdatedCars(cars, wordToPrepend){...}
```

This is the time to stop and think about the bigger picture. What if I want to do something else then prepend, 
is this function reusable and clean enough? Is this thinking premature optimisation?

> Our hidden goal is to build up a habit of writing good quality code. If this becomes our habit, we will follow 
> best practices by default and it will never be premature optimisation. Anyway, writing spaghetti code can 
> never be justified by premature optimisation :)

Lets revise our solution by become a bit functional. 

> Oh crap another functional guy, but don't worry not as much functional :)

My idea of the solution is as follows: What if I have a cars array and I could run any kind of transformation function 
on it in order to get an updated cars array. I could have a little utility library with all the transformation 
functions I will ever need and I can slowly create more, when the need will arise. Lets be SOLID, DRY, let's follow 
SRP and YAGNI. 

> Yes design patterns are an important knowledge of every seasoned developer :)


But back to the code:

``` 
const getUpdatedCars = (cars, transformCars) => cars.map(transFormCars);
```

We have done a few things here:

1. we created a very descriptive function, where it is very clear what it does
2. we shifted the responsibility of the actual transformation to an external function
3. we used a function expression to make the code more clean and readable

Even without flow or documentation, it is quiet easy to understand what the function does and the next steps became 
very evident.

<b>Time to create our transformation function and explain our reasoning behind.</b> 

Our intent is to create a function which will update the colors of a car with whatever I want.

``` 
const updateCarColor = (updateFn) => (car) => (...);
```
We follow the same functional reasoning as before. We created a curried function for two reasons:

1. we want to create partially applied functions
2. we want to be able to pass the function into map

Here are our partially applied functions, which will work with our cars loop:

``` 
const prependText = updateCarColor(prependTextFn);
const appendText = updateCarColor(appendTextFn);
```

This is the point where we need to stop and think a little 'YAGNI'. We need to think about the level of abstraction we want. 

Many hardcore functional programmers will break down everything to such a level of abstraction that their code at the 
end looses all benefits of readability and maintainability. It becomes easier to just create a new solution than 
reuse the existing functions.

> YAGNI - You aren't gonna need it

Lets return back to our intents here for a second. We to be able to prepend or append any kind of text and that should 
do for now. Since we have broken down our initial solution to small reusable and replaceable functions, we can very 
easily create a different solution, if the need arises and just refactor and replace what we have so far without worrying 
much about breaking the code.

To sum up the next step: we want to be able to map trough the colors array of the car and be able to apply any 
transformation function on each color of a car.


``` 
const updateCarColor = (transformCarColor) => (car) => ({ ...car, colors: car.colors.map(transformCarColor) });
```

The only step missing is the actual transformCarColor function.

``` 
const appendStringToColor = (string) => (color) => ({ name: `${color.name} ${string}` });
const appendNewToColor = appendStringToColor('new');
```

We now have a function which accepts a color and appends the word new to it. 

How would our solution look like in a real project?

```
import {
  getUpdatedCars,
  appendNewToColor,
} from './bad_practice/car-utils';

getUpdatedCars(carsData, appendNewToColor);
```

We abstracted all the functions to a utils file and use only what we need. It is clear what the function does, 
although we could work on the naming :) , our solution is declarative and reusable.It is easy to test, 
easy to change, easy to extend. All the functions we created so far are following SRP, they have only one 
responsibility, they do only one thing. We can easily combine them though and compose more complex solutions. 
All of the functions are pure and writing a test is just saying this goes in and I expect that coming out.

### Flow, documentation and what missed

So are we ready yet? No, not really :)
So far followed the happy path approach.
 
> happy path is actually a design principle I follow while programming, it works really well with Demeter's law

We didn't really deal with exceptions. So what can go wrong here?
 
Before answering, we are going to write some flow types. Writing the types should make the errors clear:

``` 
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

The advantage of using flow here is, that we have a chance to be notified about defect by the flow server. 
Of course, test coverage will also be helpful in detecting edge cases we forgot to cover.

By deploying this solution we would introduce a random hard to track error every time our API would return cars 
without colors and causing a really unpleasant experience for our customers.

Thanks to our refactoring, there is only 2 places where our application can break, so let's fix them:

``` 
const appendStringToColor = (string) => (color) => ({ name: `${color ? color.name: ''} ${string}` });

const updateCarColor = (updateFn) => (car) => {
  // we just want to return whatever is passed in and let application handle the incorrect car
  if (!car || !car.colors) {
    return car;
  }

  return { ...car, colors: car.colors.map(updateFn) };
};
```
If we would call <b>color.name</b> and "color" is undefined, we would get an error. The same goes for <b>car.colors</b>.

The exception handling here is not the best but proves the point for the article. TBH I prefer to throw Errors and 
handle them in a try catch, but this really depends on the application and the developers approach. 

Even if we didn't cover every error, once they appear, they will be very specific and we will know exactly the function
where it happened and how to fix it.

> We have small simple functions therefore errors are easy to find and easy to fix

I will leave the complete flow coverage and documentation for another article. I believe the functions are easy to 
grasp, even without a docblock. The only function which really needs a docblock is the getUpdatedCars. As you 
can see naming functions the way everyone can understand your intent is really hard and documentation can help here a lot.

``` 
/**
 * Use this function to get a new array of cars with updated values,
 * you can pass in any function which is able to convert a car object
 *
 * @param {Array} cars - an array of car [{company: [string], cars: [[{name: [string]}]]}]
 * @param {Function} updateFn - a function which converts a Car to a new desired format
 * 
 * @returns {Array} - returns an Array of cars with same length but transformed content
 */
export const getUpdatedCars = (cars: Cars, updateFn: (car: Car): Cars => Car) => cars.map(updateFn);

```


### Closing words

What to take away from this article? Best practices has their meaning but when people don't see the bigger picture 
and lack the required knowledge they will see almost no meaning in writing good code. Writing good quality code should 
be a habit, I would write the nested for loops directly the way we wrote the final solution. It would 
take me almost the same amount of time. Writing good code is not premature optimisation and even though it can 
take slightly more time and following the best practice rules is sometimes a pain in the ***, it will pay of in 
the long term. Your code will have less bugs and even if a bug is discovered in the future, it will be easy to fix.

We have a GITHUB repo where we started to gather code we think can be improved, 
it will have the final code with tests, flow types and explanations. Everyone is 
welcome to contribute and open discussions. 

The solution presented above is not the only way or the best way of doing it but it definitely is my take on the 
nested for loops and I am more than happy to discuss the good or bad parts of my solution :)
