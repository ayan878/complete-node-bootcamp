const fs = require("fs");
const server = require("http").createServer();
console.log(server);

server.on("require", (req, res) => {
  // Solution 1
  fs.readFile("test-file.text", (err, data) => {
    if (err) {
      console.log(err);
      res.end(data);
    }
  });
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
