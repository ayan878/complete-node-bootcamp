const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1: Using fs.readFile
  // In this solution, Node.js will load the entire file into memory before sending it
  fs.readFile("test-file.txt", (err, data) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Error reading file");
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
    res.statusCode(500);
    res.end("File not found");
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
