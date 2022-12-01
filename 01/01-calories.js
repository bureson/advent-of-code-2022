const fs = require('fs');

(function () {
  fs.open('./input.txt', 'r', (err, file) => {
    fs.readFile(file, { encoding: 'utf-8' }, (err, data) => {
      const list = data.split('\r\n');
      const sumList = [];
      let calorieSubTotal = 0;
      for (const calories of list) {
        if (calories === '') {
            sumList.push(calorieSubTotal);
            calorieSubTotal = 0;
        } else {
            calorieSubTotal += Number(calories);
        }
      }
      console.log(Math.max(...sumList));
    });
  });
})();