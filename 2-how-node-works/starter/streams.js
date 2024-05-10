const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1 : In this soltuion node will have load entire file into memory becosue after ready it can send data
  fs.readFile("test-file.txt", (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end("Error reading file");
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(data);
    }
  });
  // Solution 2 : Streams
  const readable = fs.createReadStream("test-file.txt");
  readable.on("data", (chunk) => {
    res.write(chunk);
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
