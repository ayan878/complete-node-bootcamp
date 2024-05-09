const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales(); // Changed from EventEmitter to Sales

myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});
myEmitter.on("newSale", () => {
  console.log("Customer name: Ayan");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});
myEmitter.emit("newSale", 9);

////###########################////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received");
  res.end("Request recieved");
});

server.on("request", (req, res) => {
  res.end("Another recieved");
});

server.on("close", () => {
  res.end("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
