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
```

## What is API?

- Application Programming Interface: a piece of software that can be used to by another piece of software , in order to allow applications to talk to each other.

## REST Architecture

- it stands for _respresentational state transfer_.
- to build restful api we need to follow some rules
  - 1. Separate API into logical resources.
  - 2. Expose structured, resource-based URLs.
  - 3. Use HTTP methods (verbs)
  - 4. send data ass JSON
  - 5. stateless

Here are examples illustrating each of the rules for building a RESTful API:

### 1. Separate API into logical resources

Consider a blogging platform where users can create, read, update, and delete blog posts. Each blog post is a separate resource. Here's how the API endpoints might be structured:

- `GET /api/posts`: Retrieve a list of all blog posts.
- `POST /api/posts`: Create a new blog post.
- `GET /api/posts/:id`: Retrieve a specific blog post by its ID.
- `PUT /api/posts/:id`: Update an existing blog post.
- `DELETE /api/posts/:id`: Delete a blog post.

### 2. Expose structured, resource-based URLs

Following the previous example, the URLs for blog post resources might look like this:

- `/api/posts`: List of all blog posts.
- `/api/posts/123`: Specific blog post with ID 123.

### 3. Use HTTP methods (verbs)

Using the same example, we can see how HTTP methods are applied:

- `GET /api/posts`: Retrieve all blog posts.
- `POST /api/posts`: Create a new blog post.
- `GET /api/posts/123`: Retrieve the blog post with ID 123.
- `PUT /api/posts/123`: Update the blog post with ID 123.
- `DELETE /api/posts/123`: Delete the blog post with ID 123.

### 4. Send data as JSON

When creating or updating a blog post, the data can be sent in JSON format in the request body. For example:

```json
// POST /api/posts (Create a new blog post)
{
  "title": "New Blog Post",
  "content": "Lorem ipsum dolor sit amet..."
}
```

### 5. Stateless RESTful API

RESTful APIs are inherently stateless, meaning that each request contains all the necessary information for the server to process it. There is no reliance on session state or client context between requests.

### Example:

```javascript
const express = require("express");
const app = express();

// 1. Separate API into logical resources
app.get("/api/posts", (req, res) => {
  // Logic to retrieve all blog posts
});

app.post("/api/posts", (req, res) => {
  // Logic to create a new blog post
});

// 2. Expose structured, resource-based URLs
app.get("/api/posts/:id", (req, res) => {
  // Logic to retrieve a specific blog post by ID
});

// 3. Use HTTP methods (verbs)

// 4. Send data as JSON (Example in previous JSON snippet)

// 5. Stateless (No specific code example, but adhering to REST principles ensures statelessness)

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## Middleware

- Out of the box, Express does not parse the body of incoming requests. This means that when a client sends data in the body of a request (e.g., form data, JSON payload), Express does not automatically make this data available on the req.body object.

- To make this data accessible, we use middleware. Middleware functions in Express have access to the request (req) and response (res) objects, and they can perform tasks such as modifying request/response objects, ending the request-response cycle, or calling the next middleware in the stack.

- Middleware is just a function that can modify the incomming request data.it is called middleware because it stands between in the middle of the request and response.

The `express.json()` middleware is used in Express to parse JSON request bodies. It is a built-in middleware function in Express and is used to handle JSON payloads sent in the request body by clients.

Here's how it works:

```javascript
const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Define routes and handle requests
app.post("/api/users", (req, res) => {
  // Access JSON request body data from req.body
  console.log(req.body);

  // Process request and send response
  res.status(200).send("User created successfully.");
});

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
```

Explanation:

- We use `app.use(express.json())` to enable JSON request body parsing middleware in our Express application.
- When a client sends a POST request to `/api/users` with JSON data in the request body, the `express.json()` middleware parses the JSON data and makes it available on `req.body` in our route handler.
- We can then access the parsed JSON data from `req.body` and process it accordingly in our route handler.

## Params

## Handling PATCH Requests:

- we have two http method to update the data.

1. PUT
2. PATCH

- PATCH is an HTTP method used to partially update a resource. It is used when you want to make a partial update to an existing resource without modifying the entire resource.
- Unlike PUT, which requires you to send the entire updated resource, PATCH allows you to send only the changes or updates that need to be applied.
- This makes PATCH more efficient for updating resources when you only want to modify specific fields or properties.
- When handling PATCH requests in an API, you need to implement logic to parse the incoming request, identify the fields that need to be updated, and apply the changes to the resource accordingly.
- PATCH requests are commonly used in RESTful APIs for updating individual fields or properties of resources without replacing the entire resource.
