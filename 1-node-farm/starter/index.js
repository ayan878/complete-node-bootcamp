const fs = require('fs');
const http = require('http');
const { json } = require('stream/consumers');
const url = require('url');

// Slugify functions often remove spaces, punctuation, and special characters, convert uppercase letters to lowercase, and replace spaces with hyphens or underscores. It helps improve the SEO (Search Engine Optimization) of a website by making URLs more descriptive and user-friendly.
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplates');

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

// const server = http.createServer((req, res) => {
//   res.end('Hello from the server!');
// });

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  // console.log(req,res);
  const { query, pathname } = url.parse(req.url, true);
  // const pathname =req.url;
  //OVERVIEW PAGE
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
  }
  //PRODUCT PAGE
  else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
    // res.end(tempProduct);
  }
  //API
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  }
  //NOT FOUND
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});
