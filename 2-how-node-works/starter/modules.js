// arguments is an array in Js and this array contains all these value that we pass into a function.

// console.log(arguments);
// console.log(require("module").wrapper);

// const { constants } = require("buffer");

// modules.exports : to export a single class/variable/function from one module to another module.
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2, 5));

//exports : to export multiple variables/functions from one module to another.
const cal2 = require("./test-module-2");
console.log(cal2.add(2, 5));

// we can also use the power of ES6 object destructuring
const { add, multiply, divide } = require("./test-module-2");
console.log(add(2, 5));
console.log(multiply(2, 5));
console.log(divide(2, 5));

// caching
require("./test-module-3")();

// both are retrieve from cache instead of loading  module again
require("./test-module-3")();
require("./test-module-3")();
