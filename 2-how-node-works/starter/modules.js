// arguments is an array in Js and this array contains all these value that we pass into a function.

// console.log(arguments);
// console.log(require("module").wrapper);

// const { constants } = require("buffer");

// modules.exports
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2, 5));


//exports