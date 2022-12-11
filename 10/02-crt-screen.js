const R = require('ramda');

const { readingFile } = require('../helper');

const signalStrength = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n').filter(x => x);

    const screen = R.range(0, 6).map(() => {
        return R.range(0, 40).map(() => '.');
    });

    let lastStrength = 1;
    let cycleNumber = 1;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const [instruction, rawNum] = line.split(' ');
        const isNoop = instruction === 'noop';

        const lineIndex = Math.floor((cycleNumber - 1) / 40);
        const linePixelIndex = (cycleNumber - 1) % 40;

        const spriteRange = R.range(lastStrength - 1, lastStrength + 2);
        
        if (cycleNumber > 39 && cycleNumber < 44) console.log({ i, instruction, rawNum, spriteRange, lastStrength, cycleNumber, linePixelIndex });
        if (spriteRange.includes(linePixelIndex)) screen[lineIndex][linePixelIndex] = '#';
        if (!isNoop && spriteRange.includes(linePixelIndex + 1)) screen[lineIndex][linePixelIndex + 1] = '#';
        
        lastStrength = isNoop ? lastStrength : lastStrength + Number(rawNum);
        cycleNumber = cycleNumber + (isNoop ? 1 : 2);
    }
    console.log(cycleNumber);
    console.log(screen.map(line => line.join('')));
};

signalStrength();
