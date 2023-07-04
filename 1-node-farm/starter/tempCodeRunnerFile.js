 fs.readFile('./txt/read-this.txt', 'utf-8', (err, data2) => {
      console.log(data2);
      fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      console.log(data3);
    });