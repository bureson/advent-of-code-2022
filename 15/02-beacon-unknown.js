const R = require('ramda');

const { readingFile } = require('../helper');

const beacon = async () => {
  const data = await readingFile('./input.txt');

  const parseCoord = coord => Number(coord.replace(',', '').replace(':', '').split('=')[1]);

  const lines = data.split('\r\n').filter(x => x).map(line => {
    const [,,sensorXinst, sensorYinst,,,,,beaconXinst, beaconYinst] = line.split(' ');
    const sensorX = parseCoord(sensorXinst);
    const sensorY = parseCoord(sensorYinst);
    const beaconX = parseCoord(beaconXinst);
    const beaconY = parseCoord(beaconYinst);
    const distance = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
    return { sensor: { x: sensorX, y: sensorY }, beacon: { x: beaconX, y: beaconY }, distance };
  });

  const minCoord = 0;
  const maxCoord = 4000000;
  const manhattanDistance = (pos1, pos2) => Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);

  const checkPos = (cel) => {
    if ([cel.x, cel.y].some(c => c < minCoord || c > maxCoord)) return false;

    for (const line of lines) {
      const d = manhattanDistance(line.sensor, cel);
      if (d <= line.distance || manhattanDistance(cel, line.beacon) === 0) return false;
    }

    console.log(cel.x * 4000000 + cel.y);
    return true;
  }

  outerLoop: for (const line of lines) {
    const x = line.sensor.x;
    const y = line.sensor.y;
    const d = line.distance + 1;

    for (const i = 0; i < d; i++) {
      if (checkPos({ x: x + i, y: y - d + i })) break outerLoop;
      if (checkPos({ x: x + d - i, y: y + i })) break outerLoop;
      if (checkPos({ x: x - i, y: y + d - i })) break outerLoop;
      if (checkPos({ x: x - d + i, y: y - i })) break outerLoop;
    }
  }

};

beacon();
