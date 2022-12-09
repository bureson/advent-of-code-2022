const R = require('ramda');

const { readingFile } = require('../helper');

const tailMovement = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n').filter(x => x);

    const ropePartList = R.range(0, 10).map((_, index) => ({ x: 0, y: 0, ...index === 9 && { tail: true } }));
    const positionList = [[0, 0]];

    const getPositionChange = (pos1, pos2) => {
        const xDif = Math.abs(pos1.x - pos2.x);
        const yDif = Math.abs(pos1.y - pos2.y);
        const getXChange = () => {
            switch (true) {
                case xDif > 1 || xDif === 1 && yDif > 1:
                    return pos1.x > pos2.x ? 1 : -1;
                default:
                    return 0;
            }
        }

        const getYChange = () => {
            switch (true) {
                case yDif > 1 || yDif === 1 && xDif > 1:
                    return pos1.y > pos2.y ? 1 : -1;
                default:
                    return 0;
            }
        }
        
        return { x: getXChange(), y: getYChange() };
    };

    for (const line of lines) {
        const [ direction, distanceRaw ] = line.split(' ');
        const distance = Number(distanceRaw);
        const stepList = R.range(0, distance);

        const axis = ['D', 'U'].includes(direction) ? 'y' : 'x';
        const incr = ['U', 'L'].includes(direction) ? -1 : 1;

        for (const step of stepList) {
            for (let i = 0; i < ropePartList.length; i++) {
                if (i === 0) {
                    ropePartList[i][axis] = ropePartList[i][axis] + incr;
                } else {
                    const { x, y } = getPositionChange(ropePartList[i - 1], ropePartList[i]);
                    ropePartList[i].x = ropePartList[i].x + x;
                    ropePartList[i].y = ropePartList[i].y + y;
                    if (ropePartList[i].tail) {
                        positionList.push([ropePartList[i].x, ropePartList[i].y]);
                    }
                }
            }
        }
    }
    
    const uniqPositionList = R.uniqWith((p1, p2) => {
        const sameX = p1[0] === p2[0];
        const sameY = p1[1] === p2[1];
        return sameX && sameY;
    }, positionList);

    console.log(uniqPositionList.length);
    
};

tailMovement();
