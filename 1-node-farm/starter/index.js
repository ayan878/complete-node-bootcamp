const fs = require("fs");
const http = require("http");

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
const server = http.createServer((req, res)=>{
    res.end('Hello from the server!');   
});

server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to request on port 8000');
});