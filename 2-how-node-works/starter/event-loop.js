// !They are not in particular order  This code is not have I/O cycle so its not running inside event loop it is not running inside any callback
// const fs = require("fs");
// setTimeout(() => console.log("Timer 1 finished"), 0);
// setImmediate(() => console.log("Immediate 1 finished"));

// fs.readFile("test-file.txt", () => console.log("I/O finished"));
// console.log("Hello from the top-level code");


// !this code have I/O cycle so its runs inside event loop 

const fs = require("fs");

setTimeout(() => console.log("Timer 1 finished"), 0);

setImmediate(() => console.log("Immediate 1 finished"));


fs.readFile("test-file.txt", () => {
  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);

  // it excute third
  setImmediate(() => console.log("Immediate 2 finished"));
  console.log("I/O finished");
  console.log("---------------------");
});

// it excute first
console.log("Hello from the top-level code");
