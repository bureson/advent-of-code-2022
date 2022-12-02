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
                    return [valueMap['Z'], 0];
                case 'Y':
                    return [valueMap['X'], 3];
                case 'Z':
                    return [valueMap['Y'], 6];
            }
        case 'B':
            switch (self) {
                case 'X':
                    return [valueMap['X'], 0];
                case 'Y':
                    return [valueMap['Y'], 3];
                case 'Z':
                    return [valueMap['Z'], 6];
            }
        case 'C':
            switch (self) {
                case 'X':
                    return [valueMap['Y'], 0];
                case 'Y':
                    return [valueMap['Z'], 3];
                case 'Z':
                    return [valueMap['X'], 6];
            }
    }
}

const tournament = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n').filter(x => x);
    const outcome = lines.reduce((sum, line) => {
        const [them, self] = line.split(' ').map(x => x.trim());
        const [selfValue, outcomeValue] = outcomeSwitch(them, self);
        return sum + selfValue + outcomeValue;
    }, 0);
    console.log(outcome);
};

tournament();