const R = require('ramda');

const { readingFile } = require('../helper');

const shortestPath = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n').filter(x => x).map(line => line.split('').map(letter => ({ letter })));

    const locToStr = loc => `${loc.y} ${loc.x}`;
    const findLoc = (letter) => {
      const locY = lines.findIndex(line => line.map(cell => cell.letter).includes(letter));
      const locX = lines[locY].findIndex(cell => cell.letter === letter);
      return { x: locX, y: locY };
    };

    const startLoc = findLoc('S');
    const endLoc = findLoc('E');
    const visited = new Set(locToStr(startLoc));

    const getElevation = letter => {
      if (letter === 'S') return 'a'.charCodeAt(0);
      if (letter === 'E') return 'z'.charCodeAt(0);
      return letter.charCodeAt(0);
    };

    const queue = [[startLoc, 0]];
    const dirList = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    const getStepCount = () => {
      while (queue.length) {
        const [loc, stepCount] = queue.shift();
        if (locToStr(loc) === locToStr(endLoc)) return stepCount;

        dirList
          .map(dir => ({ x: loc.x + dir[0], y: loc.y + dir[1] }))
          .filter(nextLoc => {
            const exists = !!lines[nextLoc.y]?.[nextLoc.x]?.letter;
            const locElevation = exists && getElevation(lines[loc.y][loc.x].letter);
            const nextLocElevation = exists && getElevation(lines[nextLoc.y][nextLoc.x].letter);
            const hasValidElevation = nextLocElevation - locElevation <= 1;
            const unvisited = !visited.has(locToStr(nextLoc));
            return exists && hasValidElevation && unvisited;
          })
          .forEach(nextLoc => {
            visited.add(locToStr(nextLoc));
            queue.push([nextLoc, stepCount + 1]);
          });
      }
      return;
    };

    const stepCount = getStepCount();
    console.log({ stepCount });

};

shortestPath();
