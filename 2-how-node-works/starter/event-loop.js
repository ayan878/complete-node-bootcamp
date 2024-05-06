// !They are not in particular order  This code is not have I/O cycle so its not running inside event loop it is not running inside any callback
// const fs = require("fs");
// setTimeout(() => console.log("Timer 1 finished"), 0);
// setImmediate(() => console.log("Immediate 1 finished"));

// fs.readFile("test-file.txt", () => console.log("I/O finished"));
// console.log("Hello from the top-level code");

// ! This code involves I/O operations, so it runs inside the event loop.

const fs = require("fs");

// Scheduled to execute after 0 milliseconds
setTimeout(() => console.log("Timer 1 finished"), 0);

// Scheduled to execute immediately after the current event loop iteration
setImmediate(() => console.log("Immediate 1 finished"));

// Initiates an asynchronous file reading operation
fs.readFile("test-file.txt", () => {
  // Callback executed after the file reading operation completes
  
  // Scheduled to execute after 0 milliseconds; will be executed after the current phase of the event loop
  setTimeout(() => console.log("Timer 2 finished"), 0);
  
  // Scheduled to execute after 3000 milliseconds
  setTimeout(() => console.log("Timer 3 finished"), 3000);

  // Scheduled to execute immediately after the current event loop iteration
  setImmediate(() => console.log("Immediate 2 finished"));

  // Printed when the file reading operation completes
  console.log("I/O finished");
  console.log("---------------------");
  
  // Scheduled to execute in the next tick of the event loop
  process.nextTick(() => {
    console.log("Process.nextTick");
  });
});

// Synchronous log message
console.log("Hello from the top-level code");
