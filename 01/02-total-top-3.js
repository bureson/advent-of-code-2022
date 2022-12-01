const fs = require('fs');

const R = require('ramda');

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
      const greatTotal = R.take(3, R.reverse(R.sortBy(R.identity, sumList))).reduce((total, subtotal) => total + subtotal);
      console.log(greatTotal);
    });
  });
})();