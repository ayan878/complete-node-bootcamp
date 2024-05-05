# How node.js works: A look behind the scenes

- node,js on several dependency like V8 and libuv
  - 1. V8: The JavaScript engine developed by Google that powers Chrome and is responsible for executing JavaScript code in Node.js.
  - 2. libuv: A multi-platform support library with a focus on asynchronous I/O. It provides the event loop and abstractions for file system operations, networking, and concurrency, allowing Node.js to perform non-blocking I/O operations efficiently.
          it also implement extremly important features of node.js
            - 1.Event Loop : it is written in js and C++ and it is responsible for handling easy task like excuting callback and network I/O
            - 2.Thread pool: it is wrttiten in C++ and it is responsible for heavy work like file access, compression etc
  - 3. npm (Node Package Manager): While not a core part of Node.js itself, npm is a widely used package manager for JavaScript that is bundled with Node.js installations. It allows developers to easily install, manage, and share packages of code.

  - node.js itself is program which is written in Js and C++.it ties all the library together not matter written in C++ or Jsand gives developer to access their function in pure JavaScript.
                        

