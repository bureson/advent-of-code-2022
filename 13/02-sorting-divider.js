const R = require('ramda');

const { readingFile } = require('../helper');

const sorting = async () => {
    const data = await readingFile('./input.txt');
    const pairList = data.split('\r\n').filter(x => x).map(line => JSON.parse(line));

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

    const appendixList = [ [[2]], [[6]] ];
    const sorted = R.sort((one, two) => {
      const result = compareListPair(one, two);
      return result ? -1 : 1;
    }, pairList.concat(appendixList));

    const positionList = [];
    for (let i = 0; i < sorted.length; i++) {
      if (appendixList.some(appendix => R.equals(sorted[i], appendix))) {
        positionList.push(i + 1);
      }
    }

    console.log(positionList[0] * positionList[1]);
};

sorting();
