const R = require('ramda');

const { readingFile } = require('../helper');

const priority = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n').filter(x => x);

    const isUpperCase = (letter) => letter.toUpperCase() === letter;
    const getPriority = (letter) => {
      return letter.charCodeAt(0) - (isUpperCase(letter) ? 38 : 96);
    };

    const sum = R.splitEvery(3, lines).reduce((total, group) => {
      const [first, second, third] = group;
      const sharedLetter = R.intersection(R.intersection(first, second), third)[0];
      return total + getPriority(sharedLetter);
    }, 0);
    console.log(sum);
};

priority();
