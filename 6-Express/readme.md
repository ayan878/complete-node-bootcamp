# Express

## What is Express? and why do use it?

- Express is a minimal node.js framework, a higher level of abstraction.
- Being "minimal" implies that Express does not come bundled with a lot of built-in features or components. Instead, it focuses on providing a solid foundation for building web servers and APIs, while leaving room for developers to add additional functionality as needed.

- In the context of Express, being minimal means that it provides a streamlined and efficient way to handle HTTP requests and responses, manage routes, and perform basic middleware operations. It allows developers to quickly set up server-side logic without imposing unnecessary constraints or dependencies.

- Expresss allows to rapid development of node.js application : we dont have to re-invent the wheel;

- Express makes it easier to organize our application into MVC architecture.

```javaScript
// 'express' is a reference variable that refers to the Express module.
const express = require('express');

// 'app' is an instance of the Express application created using the Express constructor.
const app = express();

app.get('/', (req, res) => {
  res.status(200);
  //   res.send('Hello from server side!');
  res.json({ message: 'Hello from server side!' });
});

app.post('/', (req, res) => {
  res.json({ message: 'You can post to this endpoint...' });
});
// Starts the Express application server on the specified port.

const port = 3000;
app.listen(port, () => {
  // Logs a message indicating that the application is running on the specified port.
  console.log(`App running on ${port}...`);
});
