## 1. What is function declaration?

- Function declaration is a way of defining a function in JavaScript by using the function keyword followed by the function name, parameters enclosed in parentheses, and the function body enclosed in curly braces.

```JavaScript
function functionName(parameter,parameters....){}
```

## 2. What is Function Expression?

- To storing function inside variable is called function expression

```JavaScript
cosnt store= function functionName(parameter,parameters....){}

// it is anonymous function
const store= function(parameter,parameters....){}
```

## 3 What are First class function?

- First-class functions refer to functions in programming languages that can be treated as first-class citizens. This means they can be:

- 1. Assigned to variables.
- 2. Passed as arguments to other functions.
- 3. Returned as values from other functions.
- 4. Stored in data structures.

**Note: "basically,Everything a variable can do, a function can also do. this is known as First class Function**"\*\*

Sure, here are examples for each of the four points:

1. **Assigned to variables:**

   ```javascript
   const greet = function () {
     console.log("Hello, world!");
   };

   greet(); // Output: Hello, world!
   ```

2. **Passed as arguments to other functions:**

   ```javascript
   function sayHello(greetingFunction) {
     greetingFunction();
   }
   console.log("Hey there!");

   sayHello(function () {}); // Output: Hey there!
   ```

3. **Returned as values from other functions:**

   ```javascript
   function createGreeter() {
     return function () {
       console.log("Good morning!");
     };
   }

   const morningGreeting = createGreeter();
   morningGreeting(); // Output: Good morning!
   ```

4. **Stored in data structures:**

   ```javascript
   const functionArray = [
     function () {
       console.log("Function 1");
     },
     function () {
       console.log("Function 2");
     },
   ];

   functionArray[0](); // Output: Function 1
   functionArray[1](); // Output: Function 2
   ```

```JavaScript
function square(num){
return num*num;
 }
 function displaySquare(fun){
    consol.log("Square is" + fun(5))
 }
displaySquare(square)
```

## 4. What is IIFE?

- IIFE stands for Immediately Invoked Function Expression. It's a JavaScript design pattern where a function is defined and immediately executed right after it's created. This pattern encapsulates code within a function scope, preventing it from polluting the global scope.

Here's a basic example:

```javascript
(function () {
  // Your code here
})();
```

```javascript
(function square(num) {
  console.log(num * num);
})(5);
```

This creates an anonymous function and immediately invokes it. The enclosing parentheses around the function declaration turn it into a function expression, and the trailing pair of parentheses invokes the function immediately after its declaration.

IIFE is commonly used to create a private scope for variables and functions, allowing you to control the visibility of code and prevent naming conflicts in larger applications.

## 12. What is Callback function?

- A callback is a function passed into another function as argument.

  ```JavaScript
  document.addEventListener("click", function name(params){

  })
  ```

## 13. What is an Arrow function?

- Arrow function were introduced in ES6 of javascript.

```JavaScript
   const add =(firstName,secondName)=>{
       return firstName+secondName;
   }
```

## Arrow Function vs Regular Function

- 1. Syntax
  ```JavaScript
  const square=(num)=>{
      return num*num;
  }
  ```
  ```JavaScript
  function square(num){
      return num*num;
  }
  ```
- 2. Implicit "return" keyword
     ```JavaScript
     const square=(num)=> num*num;
     ```
     _we cant return implicitly inside regular function._

- 3. arguments :
     ```JavaScript
     function fun=(){
        console.log(arguments)
     }
     fun(1,3,5)
     ```
     _we cannot have arguments keyword not inside arrow function._
- 4. "This" keyword
     ```JavaScript
     let user = {
        username: "Ayan Raza",
        arrFun: () => {
                 console.log("I'm" + this.username);
        },
        regFuntion() {
                 console.log("i'm" + this.username);
        },
     };
     user.arrFun();
     user.regFuntion();
     ```

# this keyword

- 1. this in global space
- 2. this in strict mode (this substitution)
- 3. this inside a function
- 4. this value depends on how this is called (window)
- 5. this inside a object's method
- 6. call apply bind methods(sharing methods)
- 7. this inside arrow function
- 8. this inside nested arrow function
- 9. this inside DOM

Your Markdown format is almost there! Just a small tweak:

````markdown
**1. "this" in global space**

```javascript
console.log(this); // In global space "this" keyword will always have the value of global object(browser: Window, Node.js: global).
```
````

Output:
Window {window: Window, self: Window, document: document, name: '', location: Location, ...}

**2. this in strict mode (this substitution):**
**3. "this" inside a function:**

```JavaScript
function x() {
    // the value depends on strict/ non-strict mode
    console.log(this);
}
// this value depends on how this is called (window)
x(); // it gives undefined in strict mode & global object in non strict mode.
window.x(); it always gives global object with reference of object (window)
```

**Note:** (this substitute) it is a phenomena in which if the value of this keyword is undefined or null, this keyword is replaced with the global object only in non-strict mode.

**5. this inside a object's method**

**Note:_If we define a function inside an object, it is referred to as a method._**

```JavaScript
    const obj={
        a:10,
        x:function(){
            console.log(this)
        }
    }
    obj.x()
```

## Three important function-

Those are indeed three important functions in JavaScript. Let me provide a brief explanation of each:

1. **call():**

   - The `call()` method is used to invoke a function with a specified `this` value and arguments provided individually.
   - Syntax: `functionName.call(thisArg, arg1, arg2, ...)`

2. **apply():**

   - The `apply()` method is similar to `call()`, but it accepts arguments as an array.
   - Syntax: `functionName.apply(thisArg, [argsArray])`

3. **bind():**
   - The `bind()` method creates a new function that, when called, has its `this` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.
   - Syntax: `functionName.bind(thisArg, arg1, arg2, ...)`

These methods are often used for setting the `this` context explicitly when calling functions and for borrowing methods from other objects.

```JavaScript
    let user={
        firstname:"Ayan",
        lastname:"Raza",
        printFullName:function(){
            console.log(this.firstname +" "+ this.lastname);
        }
    }
    user.printFullName()

```

```javaScript
        let user = {
            firstname: "Ayan",
            lastname: "Raza",
        };

        let printFullName = function (hometown,state) {
        console.log(this.firstname + " " + this.lastname + "from " + hometown,state);
        };

        // function borrowing
        // first parameter is always refer to this variable and the later argument refer to the function
        printFullName.call(user, "Siwan","Bihar);

        let user2 = {
            firstname: "Belal",
            lastname: "Ahmed",
        };

        printFullName.call(user2, "Ziradei","Bihar");

        let user3 = {
            firstname: "Neha",
            lastname: "Singh",
        };

        // apply() method
        printFullName.apply(user3, ["Pachrukhi", "Bihar"]);

        // bind() method
        let printMyName = printFullName.bind(user, "Siwan", "Bihar");
        console.log(printMyName); // it print the function
        printMyName();

```
_bind() is basically used to just bind and keep a copy of that method , to used it later_
