const fs = require("fs");
const { Writable } = require("stream");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1: Using fs.readFile
  // In this solution, Node.js will load the entire file into memory before sending it
  fs.readFile("test-file.txt", (err, data) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Error reading file." + " " + err.message);
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(data);
    }
  });

  // Solution 2: Using Streams
  // In this solution, Node.js will stream the file content to the response
  const readable = fs.createReadStream("test-file.txt");
  readable.on("data", (chunk) => {
    res.write(chunk);
  });
  readable.on("end", () => {
    res.end();
  });
  readable.on("error", (err) => {
    res.statusCode = 500; // Corrected: assigning status code using '=' in express we can implement like res.status(500)
    res.end("File not found");
  });

  // Solution 3 : fix the back pressure
  const readable1 = fs.createReadStream("test-file.txt");

  // readableResource.pipe(Writable-destination);
  readable1.pipe(res);
});


server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
