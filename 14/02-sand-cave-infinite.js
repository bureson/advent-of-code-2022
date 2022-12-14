const R = require('ramda');

const { readingFile } = require('../helper');

const sandCave = async () => {
  const data = await readingFile('./input.txt');
  const lines = data.split('\r\n').filter(x => x);

  let rockMap = {};

  const xList = lines.reduce((list, line) => {
    const lineXList = line.split(' -> ').map(coord => Number(coord.split(',')[0]));
    return list.concat(lineXList);
  }, []);

  const yList = lines.reduce((list, line) => {
    const lineXList = line.split(' -> ').map(coord => Number(coord.split(',')[1]));
    return list.concat(lineXList);
  }, []);

  const minX = Math.min(...xList);
  const maxX = Math.max(...xList);
  const minY = 0; // Math.min(...yList);
  const maxY = Math.max(...yList) + 2;

  for (let y = minY; y <= maxY; y++) {
    if (!rockMap[y]) rockMap[y] = {};
    for (let x = minX; x <= maxX; x++) {
      rockMap[y][x] = y === maxY ? '#' : '.';
    }
  }

  for (const line of lines) {
    const coordPairList = line.split(' -> ');
    for (let i = 0; i < (coordPairList.length - 1); i++) {
      const [startX, startY] = coordPairList[i].split(',').map(Number);
      const [endX, endY] = coordPairList[i + 1].split(',').map(Number);
      for (let y = Math.min(startY, endY); y <= Math.max(startY, endY); y++) {
        for (let x = Math.min(startX, endX); x <= Math.max(startX, endX); x++) {
          rockMap[y][x] = '#';
        }
      }
    }
  }

  let running = true;
  let sandCount = 0;

  while (running) {
    const sand = { x: 500, y: 0 };
    while (running) {
      if (rockMap[sand.y][sand.x] === 'o') {
        running = false;
        break;
      }
      if (rockMap[sand.y + 1][sand.x] === '.') {
        sand.y += 1;
        continue;
      }
      if (['o', '#'].includes(rockMap[sand.y + 1][sand.x])) {
        if (!rockMap[sand.y][sand.x - 1]) {
          rockMap = R.mapObjIndexed((row, y) => R.assoc(sand.x - 1, Number(y) === maxY ? '#' : '.', row), rockMap);
        }
        if (!rockMap[sand.y][sand.x + 1]) {
          rockMap = R.mapObjIndexed((row, y) => R.assoc(sand.x + 1, Number(y) === maxY ? '#' : '.', row), rockMap);
        }
        if (rockMap[sand.y + 1][sand.x - 1] === '.') {
          sand.y += 1;
          sand.x -= 1;
        } else if (rockMap[sand.y + 1][sand.x + 1] === '.') {
          sand.y += 1;
          sand.x += 1;
        } else {
          sandCount++;
          rockMap[sand.y][sand.x] = 'o';
          break;
        }
      }
    }
  }

  console.log(Object.values(rockMap).map(line => Object.values(line).join('')).join('\n'));
  console.log({ sandCount });

};

sandCave();
