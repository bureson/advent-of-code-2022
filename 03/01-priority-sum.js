const R = require('ramda');

const { readingFile } = require('../helper');

const priority = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n').filter(x => x);

    const isUpperCase = (letter) => letter.toUpperCase() === letter;
    const getPriority = (letter) => {
      return letter.charCodeAt(0) - (isUpperCase(letter) ? 38 : 96);
    };

    const sum = lines.reduce((total, line) => {
      const first = R.take(line.length / 2, line);
      const second = R.takeLast(line.length / 2, line);
      const sharedLetter = R.intersection(first, second)[0];
      return total + getPriority(sharedLetter);
    }, 0);
    console.log(sum);
};

priority();
