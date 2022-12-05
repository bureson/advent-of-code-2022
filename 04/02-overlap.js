const R = require('ramda');

const { readingFile } = require('../helper');

const containment = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n').filter(x => x);

    const count = lines.reduce((subCount, line) => {
      const [rangeOne, rangeTwo] = line.split(',');
      const [rangeOneStart, rangeOneEnd] = rangeOne.split('-');
      const [rangeTwoStart, rangeTwoEnd] = rangeTwo.split('-');
      const rangeOneList = R.range(Number(rangeOneStart), Number(rangeOneEnd) + 1);
      const rangeTwoList = R.range(Number(rangeTwoStart), Number(rangeTwoEnd) + 1);
      const contained = R.intersection(rangeOneList, rangeTwoList).length > 0;
      return contained ? subCount + 1 : subCount;
    }, 0);
    console.log(count);
};

containment();
