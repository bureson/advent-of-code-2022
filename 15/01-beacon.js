const R = require('ramda');

const { readingFile } = require('../helper');

const beacon = async () => {
  const data = await readingFile('./input.txt');
  const lines = data.split('\r\n').filter(x => x);

  const yOfInterest = 2000000;

  const map = {};
  const draw = (x, y, point) => {
    if (!map[y]) map[y] = {};
    map[y][x] = point;
  };

  const parseCoord = coord => Number(coord.replace(',', '').replace(':', '').split('=')[1]);
  for (const line of lines) {
    const [,,sensorXinst, sensorYinst,,,,,beaconXinst, beaconYinst] = line.split(' ');
    const sensorX = parseCoord(sensorXinst);
    const sensorY = parseCoord(sensorYinst);
    const beaconX = parseCoord(beaconXinst);
    const beaconY = parseCoord(beaconYinst);
    const distance = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);

    draw(sensorX, sensorY, 'S');
    draw(beaconX, beaconY, 'B');

    for (let x = sensorX - distance; x <= sensorX + distance; x++) {
      const pointDistance = Math.abs(sensorX - x) + Math.abs(sensorY - yOfInterest);
      if (pointDistance <= distance && !['S', 'B'].includes(map[yOfInterest]?.[x])) {
        draw(x, yOfInterest, '#');
      }
    }
  }

  console.log(Object.values(map[yOfInterest]).filter(point => point === '#').length);

};

beacon();
