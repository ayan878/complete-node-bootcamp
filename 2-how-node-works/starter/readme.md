# How node.js works: A look behind the scenes

- **node,js on several dependency like V8 and libuv**

  - **1. V8:** The JavaScript engine developed by Google that powers Chrome and is responsible for executing JavaScript code in Node.js.
  - **2. libuv:** A multi-platform support library with a focus on asynchronous I/O. It provides the event loop and abstractions for file system operations, networking, and concurrency, allowing Node.js to perform non-blocking I/O operations efficiently.
    it also implement extremly important features of node.js - 1.Event Loop : it is written in js and C++ and it is responsible for handling easy task like excuting callback and network I/O - 2.Thread pool: it is wrttiten in C++ and it is responsible for heavy work like file access, compression etc
  - **3. npm (Node Package Manager):** While not a core part of Node.js itself, npm is a widely used package manager for JavaScript that is bundled with Node.js installations. It allows developers to easily install, manage, and share packages of code.

  - node.js itself is program which is written in Js and C++.it ties all the library together not matter written in C++ or Jsand gives developer to access their function in pure JavaScript.

- **node.js not only relies on V8 and libuv but also on http-parser, c-ares, OpenSSL,zlib.**

  - **1. http-parser**: This is a HTTP request/response parser written in C, which Node.js uses to efficiently parse HTTP messages.

  - **2. c-ares**: A C library that provides asynchronous DNS requests. Node.js uses c-ares to perform DNS lookups asynchronously, which is crucial for non-blocking I/O operations.

  - **3. OpenSSL**: A cryptography library that provides support for SSL/TLS protocols and encryption algorithms. Node.js uses OpenSSL for secure communication, such as HTTPS.

  - **4. zlib**: A compression library that provides support for gzip and deflate compression algorithms. Node.js uses zlib to compress and decompress data, which is useful for handling compressed data over the network.

# Thread, Thread-Pool, and Event Loop

- **1. Node.js Process**: When we run a Node.js program, it starts a Node.js process, which is like a container holding the program while it's running.

- **2. Single Thread**: By default, Node.js runs programs using just one thread. This thread executes instructions one by one, like following a single line of tasks.

- **3. Event Loop**: The event loop is the brain of Node.js. It handles multiple tasks efficiently without getting stuck. For example, if a program needs to read a file, the event loop instructs Node.js to start reading the file and then moves on to other tasks while waiting for the file operation to complete.

- **4. Thread Pool**: Node.js has a special pool of threads that it can use for certain tasks that benefit from multiple threads, such as reading files or performing complex calculations. These tasks happen in the background without slowing down the main program.

In simple terms, Node.js can juggle multiple tasks at once, even though it technically only does one thing at a time.

# What Happens in a Single Thread When We Start a Node.js Application

- **Initialization**: When we start a Node.js application, the program initializes by executing the top-level code. This includes loading all required modules and registering any callbacks needed for asynchronous operations.

  ```javascript
  // Example of top-level code
  const fs = require("fs");
  const http = require("http");
  ```

- **Execution of Top-Level Code**: All code present at the top level of the application is executed in sequence. This could involve variable declarations, function definitions, and other synchronous operations.

  ```javascript
  // Example of top-level code execution
  const greeting = "Hello, World!";
  console.log(greeting);
  ```

- **Loading Required Modules**: Node.js loads all required modules, including core modules and external dependencies, to prepare the environment for execution.

  ```javascript
  // Example of loading required modules
  const fs = require("fs");
  const http = require("http");
  ```

- **Registration of Callbacks**: Any asynchronous operations, such as file I/O or network requests, may involve registering callback functions to be executed when those operations complete.

  ```javascript
  // Example of registering callback for file read operation
  fs.readFile("example.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    console.log("File content:", data);
  });
  ```

- **Start Event Loop**: After initialization, Node.js starts the event loop to handle asynchronous operations and callbacks.

In essence, during the initialization phase, Node.js sets up the environment and prepares for the execution of the application's code, including any asynchronous operations that may occur.

# What is the purpose of the thread pool in Node.js?

- The thread pool in Node.js is used to offload heavy or blocking operations from the event loop, ensuring that the application remains responsive. When a heavy task is encountered, such as file I/O or cryptographic operations, DNS lookup, it is handed off to the thread pool where it is executed asynchronously in separate threads. This allows the event loop to continue processing other tasks while the heavy operation is performed in the background.
  By utilizing the thread pool, Node.js can efficiently handle concurrent operations without blocking the main event loop. This helps improve the overall performance and scalability of Node.js applications, especially in scenarios where multiple I/O-bound or CPU-bound tasks need to be processed simultaneously.

# Event Loop

- the event loop in Node.js runs within a single thread of the main process. This event loop continuously iterates, handling asynchronous operations and callbacks efficiently, ensuring that Node.js remains non-blocking and responsive.
- All the application code that is inside the callback functions (non-top-level code).
- Node.js is designed around callback functions, which play a central role in handling asynchronous tasks and maintaining non-blocking behavior.
- **Event-driven architeture:**
  - Event are emitted
  - Event loops picks them up
  - Callbacks are called

## Phases of the Node.js Event Loop

1. **Timers Phase**: Executes callbacks scheduled by `setTimeout()` and `setInterval()`. For example:

   ```javascript
   setTimeout(() => {
     console.log("Timer callback executed!");
   }, 1000);
   ```

2. **Pending Callbacks Phase**: Executes I/O callbacks deferred from the previous cycle, such as network requests and file system operations.

3. **Idle and Prepare Phases**: Internal phases generally not used in user-space code.

4. **Poll Phase**: Waits for new I/O events to occur. If no pending callbacks exist, Node.js will wait for events to be triggered.

5. **Check Phase**: Executes `setImmediate()` callbacks. For example:

   ```javascript
   setImmediate(() => {
     console.log("Immediate callback executed!");
   });
   ```

6. **Close Callbacks Phase**: Executes callbacks registered via `close` events, like `socket.on('close', ...)`.

![phase](https://miro.medium.com/v2/resize:fit:700/1*7BWoV9593JHdm8M-UF-tYQ.png)

## `process.nextTick` vs. Microtasks in Node.js

### `process.nextTick`:

- `process.nextTick` is a method provided by the Node.js runtime for scheduling callback functions to be executed asynchronously but before any I/O event is fired.
- Callbacks scheduled with `process.nextTick` are executed immediately after the current operation completes, regardless of the current phase of the event loop.
- They have higher priority than other asynchronous operations such as I/O operations, timers, or microtasks.
- Example:
  ```javascript
  process.nextTick(() => {
    console.log("This will be executed next tick");
  });
  ```

### Microtasks:

- Microtasks are another type of asynchronous operation, scheduled at the end of the current event loop iteration but before the next event loop cycle begins.
- Often used for scheduling small, high-priority tasks that need to be executed before the next event loop cycle, such as promise callbacks (`then` and `catch`).
- Implemented using the `Promise` API in JavaScript.
- Examples include promise callbacks (`then` and `catch`) and `queueMicrotask`.
- Example:
  ```javascript
  Promise.resolve().then(() => {
    console.log("This will be executed as a microtask");
  });
  ```

## How to Prevent Blocking the Event Loop

1. **Avoid Synchronous File System Operations**:

   - Instead of using synchronous functions like `fs.readFileSync`, prefer their asynchronous counterparts such as `fs.readFile`.
   - Example:
     ```javascript
     // Synchronous file read operation (blocking)
     const data = fs.readFileSync("file.txt", "utf8");
     ```

2. **Avoid Complex Calculations**:

   - Avoid performing CPU-intensive operations, especially nested loops or recursive functions, that may block the event loop.
   - Example:
     ```javascript
     // Nested loop example (potentially blocking)
     for (let i = 0; i < 1000; i++) {
       for (let j = 0; j < 1000; j++) {
         // Complex calculations
       }
     }
     ```

3. **Be Mindful of JSON Operations**:

   - When working with large JSON objects, be cautious as parsing or stringifying them can be CPU-intensive and block the event loop.
   - Example:
     ```javascript
     // Parsing a large JSON object (blocking)
     const largeObject = JSON.parse(jsonString);
     ```

4. **Avoid Complex Regular Expressions**:
   - Complex regular expressions, especially those with nested quantifiers or backtracking, can lead to blocking behavior.
   - Example:
     ```javascript
     // Complex regular expression (potentially blocking)
     const regex = /(a+)+b/;
     ```

By following these guidelines and avoiding synchronous and CPU-intensive operations, you can prevent blocking the event loop and ensure the responsiveness of your Node.js applications.

# Event Loop in Practice

- They are not in particular order This code is not have I/O cycle so its not running inside event loop it is not running inside any callback

```
const fs = require("fs");
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => console.log("I/O finished"));
console.log("Hello from the top-level code");
```

#### Certainly! Here's the explanation of the execution phase of the provided code:

1. **Importing Modules**: The code begins by importing the `fs` module using `require("fs")`.

2. **Timer and Immediate Callbacks Registration**: Two asynchronous operations are scheduled:
   - A timer callback (`setTimeout`) is scheduled to be executed after 0 milliseconds.
   - An immediate callback (`setImmediate`) is scheduled to be executed immediately after the current event loop iteration.

3. **File Reading Operation**: An asynchronous file reading operation (`fs.readFile`) is initiated. This operation reads the contents of the file "test-file.txt" asynchronously.

4. **Log Message**: A synchronous log message is printed to the console, indicating "Hello from the top-level code".

5. **Event Loop Execution**: The event loop begins execution, handling the registered timer and immediate callbacks, as well as any I/O operations.

6. **Execution of Immediate Callback**: Since `setImmediate` callbacks have higher priority in the event loop, the "Immediate 1 finished" message is printed first.

7. **File Reading Completion**: Once the file reading operation completes, the corresponding callback (`() => console.log("I/O finished")`) is executed, printing "I/O finished".

8. **Timer Callback Execution**: Finally, the timer callback (`() => console.log("Timer 1 finished")`) is executed, printing "Timer 1 finished".

### Output
```
Hello from the top-level code
Timer 1 finished
Immediate 1 finished
I/O finished
```
setTimer is set to 0 i.e, it print after top-level code.

### This code involves I/O operations, so it runs inside the event loop.
```
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
```

### Output
```
Hello from the top-level code
Timer 1 finished
Immediate 1 finished
I/O finished
---------------------
Process.nextTick
Immediate 2 finished
Timer 2 finished
Timer 3 finished
```