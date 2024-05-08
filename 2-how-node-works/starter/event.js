const EventEmitter = require("events");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new EventEmitter();

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

////###########################//

// const server = http.createServer();
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request recieved");
});

server.on("request", (req, res) => {
  res.end("Another request");
});
server.on("request", (req, res) => {
  res.end("Another request");
});

server.listen("8000", "127.0.0.1", () => {
  console.log("Waiting for request.... ");
});
