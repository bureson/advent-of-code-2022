const R = require('ramda');

const { readingFile } = require('../helper');

const sorting = async () => {
    const data = await readingFile('./input.txt');
    const pairList = R.splitEvery(2, data.split('\r\n').filter(x => x).map(line => JSON.parse(line)));

    const isList = x => Array.isArray(x);
    const toList = valueOrArray => isList(valueOrArray) ? valueOrArray : [valueOrArray];
    const isNumber = x => R.type(x) === 'Number';

    const compareListPair = (one, two) => {
      if ([one, two].every(isNumber)) {
        if (one > two) return false;
        if (one < two) return true;
        return null;
      } else if ([one, two].every(isList)) {
        for (let i = 0; i < Math.min(one.length, two.length); i++) {
          const output = compareListPair(one[i], two[i]);
          if (!R.isNil(output)) return output;
        }
        if (one.length < two.length) return true;
        if (two.length < one.length) return false;
        return null;
      } else {
        return compareListPair(isNumber(one) ? toList(one) : one, isNumber(two) ? toList(two) : two);
      }
    }

    const sum = pairList.reduce((subSum, pair, index) => {
      const [one, two] = pair;
      const rightOrder = compareListPair(one, two);
      return rightOrder ? subSum + index + 1 : subSum;
    }, 0);

    console.log({ sum });

};

sorting();
