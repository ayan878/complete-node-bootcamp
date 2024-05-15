// 'express' is a reference variable that refers to the Express module.
const express = require('express');
const fs = require('fs');
// 'app' is an instance of the Express application created using the Express constructor.
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
// app.get('/', (req, res) => {
//   res.status(200);
//   //   res.send('Hello from server side!');
//   res.json({ message: 'Hello from server side!' });
// });

// app.post('/', (req, res) => {
//   res.json({ message: 'You can post to this endpoint...' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours } });
});

// params
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

  // Check if the ID parameter is greater than the length of the tours array
  //   if (req.params.id * 1 > tours.length) {
  //     return res.status(404).json({ status: 'failed', message: 'Invalid ID' });
  //   }

  // Find the tour with the provided ID
  const tour = tours.find((el) => el.id === req.params.id * 1);

  if (!tour) {
    return res.status(404).json({ status: 'failed', message: 'Invalid ID' });
  }

  // Respond with the tour data
  res.status(200).json({ status: 'success', data: { tour } });
});

app.post('/api/v1/tours', (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        // Handle error if file writing fails
        res
          .status(500)
          .json({ status: 'error', message: 'Failed to write to file' });
      } else {
        res.status(201).json({ status: 'success', data: { tours } });
      }
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);

  if (!tour) {
    return res.status(404).json({ status: 'failed', message: 'Invalid ID' });
  }
  res.status(200).json({
    status: 'succes',
    data: {
      tour: '<Updated tour here...',
    },
  });
});

// Starts the Express application server on the specified port.
const port = 3000;
app.listen(port, () => {
  // Logs a message indicating that the application is running on the specified port.
  console.log(`App running on ${port}...`);
});
