const R = require('ramda');

const { readingFile } = require('../helper');

const containment = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n').filter(x => x);

    const count = lines.reduce((subCount, line) => {
      const [rangeOne, rangeTwo] = line.split(',');
      const [rangeOneStart, rangeOneEnd] = rangeOne.split('-');
      const [rangeTwoStart, rangeTwoEnd] = rangeTwo.split('-');
      const twoContainsOne = (Number(rangeOneStart) >= Number(rangeTwoStart)) && (Number(rangeOneEnd) <= Number(rangeTwoEnd));
      const oneContainsTwo = (Number(rangeOneStart) <= Number(rangeTwoStart)) && (Number(rangeOneEnd) >= Number(rangeTwoEnd));
      const contained = oneContainsTwo || twoContainsOne;
      return contained ? subCount + 1 : subCount;
    }, 0);
    console.log(count);
};

containment();
