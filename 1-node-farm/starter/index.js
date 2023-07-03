const fs = require("fs");
const textIn = fs.readFileSync("txt/input.txt", "utf-8");
console.log(textIn);
const textOut =`this is avacado: ${textIn}.\n created on ${Date.now()}`;
fs.writeFileSync('./txt/Output.txt', textOut);