const R = require('ramda');

const { readingFile } = require('../helper');

const detectMarker = async () => {
    const charLen = 14;
    const data = await readingFile('./input.txt');
    for (let i = 0; i < data.length; i++) {
      const string = R.drop(i, data);
      const charSet = R.take(charLen, string);
      if (R.uniq(charSet).length === charSet.length) {
        console.log(i + charLen);
        break;
      }
    }

};

detectMarker();
