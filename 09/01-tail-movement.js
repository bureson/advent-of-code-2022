const R = require('ramda');

const { readingFile } = require('../helper');

const tailMovement = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n').filter(x => x);

    const headPosition = { x: 0, y: 0 };
    const tailPosition = { x: 0, y: 0 };
    const positionList = [[0, 0]];

    const getTailChange = () => {
        const xDif = Math.abs(headPosition.x - tailPosition.x);
        const yDif = Math.abs(headPosition.y - tailPosition.y);
        const getXChange = () => {
            switch (true) {
                case xDif > 1 || xDif === 1 && yDif > 1:
                    return headPosition.x > tailPosition.x ? 1 : -1;
                default:
                    return 0;
            }
        }

        const getYChange = () => {
            switch (true) {
                case yDif > 1 || yDif === 1 && xDif > 1:
                    return headPosition.y > tailPosition.y ? 1 : -1;
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
            headPosition[axis] = headPosition[axis] + incr;
            const { x, y } = getTailChange();
            tailPosition.x = tailPosition.x + x;
            tailPosition.y = tailPosition.y + y;
            positionList.push([tailPosition.x, tailPosition.y]);
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
