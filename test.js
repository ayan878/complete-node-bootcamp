// debugger
// function square(num) {
//   return num * num;
// }

// function displaySquare(fun) {
//   console.log("Square is " + fun(5));
// }

// displaySquare(square);

// let user = {
//   username: "Ayan Raza",
//   arrFun: () => {
//     console.log("I'm " + this.username);
//   },
//   regFuntion() {
//     console.log("i'm " + this.username);
//   },
// };
// user.arrFun();
// user.regFuntion();

// console.log(this);
// "use strict";
// function x() {
//   console.log(this);
// }
// x();
// window.x();

// const obj = {
//   a: 10,
//   x: function () {
//     console.log(this);
//   },
// };
// obj.x();

// function sayHello(greetingFunction) {
//   greetingFunction();
// }
// console.log("Hey there!");

// sayHello(function () {}); // Output: Hey there!

////
// function square(num) {
//   return num * num;
// }
// function displaySquare(fun) {
//   console.log("Square is " + fun(5));
// }
// displaySquare(function square(num) {
//   return num * num;
// });

let user = {
  firstname: "Ayan",
  lastname: "Raza",
};

let printFullName = function (hometown, state) {
  console.log(
    this.firstname + " " + this.lastname + " from " + hometown,
    state
  );
};

// first parameter is always refer to this variable and the later argument refer to the function
printFullName.call(user, "Siwan", "Bihar");
let user2 = {
  firstname: "Belal",
  lastname: "Ahmed",
};

let user3 = {
  firstname: "Neha",
  lastname: "Singh",
};

// function borrowing
printFullName.call(user2, "Ziradei", "Bihar");

// apply() method
printFullName.apply(user3, ["Pachrukhi", "Bihar"]);

// bind() method
let printMyName = printFullName.bind(user, "Siwan", "Bihar");
console.log(printMyName); // it print the function
printMyName();

const printReturnValue = (getAge = function () {
  return { name: this.name, age: this.age };
});
var person = {
  name: "neha",
  age: 23,
};
var person2 = {
  name: "ayan",
  age: 24,
};

console.log(getAge.call(person));
console.log(printReturnValue);
// console.log(getAge.call(person2));

// console.log(getAge.bind(person));
// console.log(getAge.bind(person2));
