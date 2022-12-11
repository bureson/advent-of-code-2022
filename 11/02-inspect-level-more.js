const R = require('ramda');

const { readingFile } = require('../helper');

const inspectLevel = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n').filter(x => x);

    let monkeyKey = null;
    let monkeyMap = {};
    let divProd = 1;

    for (const line of lines) {
        if (line.startsWith('Monkey')) {
            const [, monkeyIndex] = line.replace(':', '').split(' ');
            monkeyMap[monkeyIndex] = { inspect: 0 };
            monkeyKey = monkeyIndex;
        }
        if (line.trim().startsWith('Starting')) {
            const [, nums] = line.split(': ');
            const numNums = nums.split(', ').map(Number);
            monkeyMap[monkeyKey].itemList = numNums;
        }
        if (line.trim().startsWith('Operation')) {
            const [, op] = line.split(': ');
            monkeyMap[monkeyKey].operation = op;
        }
        if (line.trim().startsWith('Test')) {
            const rawNum = R.last(line.split(' '));
            const monkeyDiv = Number(rawNum);
            divProd = divProd * monkeyDiv;
            monkeyMap[monkeyKey].division = monkeyDiv;
        }
        if (line.trim().startsWith('If true')) {
            const yesMonkeyIndex = R.last(line.split(' '));
            monkeyMap[monkeyKey].true = yesMonkeyIndex;
        }
        if (line.trim().startsWith('If false')) {
            const yesMonkeyIndex = R.last(line.split(' '));
            monkeyMap[monkeyKey].false = yesMonkeyIndex;
        }
    }

    for (let i = 0; i < 10000; i++) {
        for (const monkeyIndex of Object.keys(monkeyMap)) {
            const monkey = monkeyMap[monkeyIndex];
            const itemList = R.clone(monkey.itemList);
            monkeyMap[monkeyIndex].inspect += itemList.length;
            for (const xitem of itemList) {
                const item = xitem % divProd;
                const tempOpValue = R.last(monkey.operation.split(' '));
                const opValue = tempOpValue === 'old' ? item : Number(tempOpValue);
                const worryLevel = monkey.operation.includes('+')
                    ? item + opValue
                    : item * opValue;
                const divisionTest = worryLevel % monkey.division;
                const targetMonkeyIndex = divisionTest === 0 ? monkey.true : monkey.false;
                monkeyMap[targetMonkeyIndex].itemList.push(worryLevel);
                monkeyMap[monkeyIndex].itemList.shift();
            }
        }
    }

    const inspectTimes = R.reverse(R.sortBy(R.identity, Object.keys(monkeyMap).map(monkeyKey => monkeyMap[monkeyKey].inspect)));
    console.log(inspectTimes[0] * inspectTimes[1]);

};

inspectLevel();
