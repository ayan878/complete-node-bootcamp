const { isUtf8 } = require("buffer");
const fs = require("fs");
const http = require("http");
const { json } = require("stream/consumers");
const url = require("url");

//blocking, Synchronous way
// const textIn = fs.readFileSync("txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut =`this is avacado: ${textIn}.\n created on ${Date.now()}`;
// fs.writeFileSync('./txt/Output.txt', textOut);
// console.log(textOut);

//Non-blocking Asynchronous  way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("Error!💥");
//   console.log(data1);
//NodeJs is start doing in background and will not block the code and it immidiatly move in next code
//thats why is first print the line no 18 than 13
//   fs.readFile("./txt/read-this.txt", "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n ${data3}`, "utf-8", (err) => {
//         console.log("File is Written ✔😊");
//       });
//     });
//   });
// });
// console.log("will read file!");

///////////////////////////////////////////////////////
// Server
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic"); // 'not-organic' is class name which display is none.
  return output;
};
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  //OVERVIEW PAGE
  if (pathName === "/" || pathName === "/overview") {

    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  }
  //PRODUCT PAGE
  else if (pathName === "/product") {
     const product = dataObj
       .map((el) => replaceTemplate(tempProduct, el))
       .join("");
     const output = tempProduct.replace(tempProduct, product);
     res.end(output);
    // res.end(tempProduct);
  }
  //API
  else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  //NOT FOUND
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
