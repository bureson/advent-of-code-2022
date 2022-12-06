const R = require('ramda');

const { readingFile } = require('../helper');

const moveCrates = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n').filter(x => x.startsWith('move'));

    let stackList = [
      ['W', 'M', 'L', 'F'],
      ['B', 'Z', 'V', 'M', 'F'],
      ['H', 'V', 'R', 'S', 'L', 'Q'],
      ['F', 'S', 'V', 'Q', 'P', 'M', 'T', 'J'],
      ['L', 'S', 'W'],
      ['F', 'V', 'P', 'M', 'R', 'J', 'W'],
      ['J', 'Q', 'C', 'P', 'N', 'R', 'F'],
      ['V', 'H', 'P', 'S', 'Z', 'W', 'R', 'B'],
      ['B', 'M', 'J', 'C', 'G', 'H', 'Z', 'W']
    ];
    for (const line of lines) {
      const [, count,, source,, destination] = line.split(' ');
      const sourceIndex = source - 1;
      const destinationIndex = destination - 1;
      const take = R.takeLast(count, stackList[sourceIndex]);
      stackList[sourceIndex] = R.dropLast(count, stackList[sourceIndex]);
      stackList[destinationIndex] = R.concat(stackList[destinationIndex], take);
    }
    const output = stackList.reduce((string, stack) => {
      return string + R.last(stack);
    }, '');
    console.log(output);
};

moveCrates();
