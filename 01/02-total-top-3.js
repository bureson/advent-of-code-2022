const R = require('ramda');

const { readingFile } = require('../helper');

const top3Sum = async () => {
    const data = await readingFile('./input.txt');
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
};

top3Sum();