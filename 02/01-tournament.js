const { readingFile } = require('../helper');

const valueMap = {
    A: 1, // Rock
    B: 2, // Paper
    C: 3, // Scissors
    X: 1, // Rock
    Y: 2, // Paper
    Z: 3 // Scissors
};

const outcomeSwitch = (them, self) => {
    switch (them) {
        case 'A':
            switch (self) {
                case 'X':
                    return 3;
                case 'Y':
                    return 6;
                case 'Z':
                    return 0;
            }
        case 'B':
            switch (self) {
                case 'X':
                    return 0;
                case 'Y':
                    return 3;
                case 'Z':
                    return 6;
            }
        case 'C':
            switch (self) {
                case 'X':
                    return 6;
                case 'Y':
                    return 0;
                case 'Z':
                    return 3;
            }
    }
}

const tournament = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n').filter(x => x);
    const outcome = lines.reduce((sum, line) => {
        const [them, self] = line.split(' ').map(x => x.trim());
        return sum + valueMap[self] + outcomeSwitch(them, self);
    }, 0);
    console.log(outcome);
};

tournament();