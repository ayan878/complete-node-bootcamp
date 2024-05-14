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
