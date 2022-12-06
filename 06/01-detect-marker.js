const R = require('ramda');

const { readingFile } = require('../helper');

const detectMarker = async () => {
    const data = await readingFile('./input.txt');
    for (let i = 0; i < data.length; i++) {
      const string = R.drop(i, data);
      const firstFour = R.take(4, string);
      if (R.uniq(firstFour).length === firstFour.length) {
        console.log(i + 4);
        break;
      }
    }

};

detectMarker();
