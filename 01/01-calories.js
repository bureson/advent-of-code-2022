const { readingFile } = require('../helper');

const calories = async () => {
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
    console.log(Math.max(...sumList));
};

calories();