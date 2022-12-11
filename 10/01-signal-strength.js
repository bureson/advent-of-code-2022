const R = require('ramda');

const { readingFile } = require('../helper');

const signalStrength = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n').filter(x => x);

    const cycleList = lines.reduce((list, line) => {
        const [instruction, rawNum] = line.split(' ');
        const lastCycleValue = R.last(list);
        const isNoop = instruction === 'noop';
        return list.concat(isNoop ? [lastCycleValue] : [lastCycleValue, lastCycleValue + Number(rawNum)]);
    }, [1]);
    
    const output = [20, 60, 100, 140, 180, 220].reduce((sum, order) => {
        const strength = order * cycleList[order - 1];
        return sum + strength;
    }, 0);

    console.log({ output });
};

signalStrength();
