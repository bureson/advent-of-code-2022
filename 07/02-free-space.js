const R = require('ramda');

const { readingFile } = require('../helper');

const folderSize = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n');

    let folderPath = [];
    let folderMap = {};
    let folderSizeList = [];

    for (const line of lines) {
        if (line.startsWith('$ cd ..')) {
            folderPath.pop();
            continue;
        }
        if (line.startsWith('$ cd')) {
            folderPath.push(R.last(line.split(' ')));
            continue;
        }
        if (line.startsWith('$ ls')) {
            continue;
        }
        if (line.startsWith('dir')) {
            const folderName = R.last(line.split(' '));
            folderMap = R.assocPath([...folderPath, folderName], {}, folderMap);
            continue;
        }
        // Note: everything else is a file
        const [fileSizeRaw, fileName] = line.split(' ');
        const fileSize = Number(fileSizeRaw);
        folderMap = R.assocPath([...folderPath, fileName], fileSize, folderMap);
    }

    const getFolderSize = (folderPath) => {
        const tree = R.path(folderPath, folderMap);
        const childList = Object.keys(tree);
        const fileSize = childList.reduce((size, child) => {
            const isNumber = R.type(tree[child]) === 'Number';
            return isNumber ? size + tree[child] : size;
        }, 0);
        const folderList = childList.filter(key => R.type(tree[key]) === 'Object');
        const folderSize = fileSize + folderList.reduce((size, folderName) => {
            return size + getFolderSize([...folderPath, folderName]);
        }, 0);

        folderSizeList.push(folderSize);
        // if (deleteAtLeast && folderSize >= deleteAtLeast) {
        // }

        return folderSize;
    };

    const maxSpaceAllowed = 40000000;
    const totalSize = getFolderSize(['/']);
    const deleteAtLeast = totalSize - maxSpaceAllowed;
    const sizeToDelete = Math.min(...folderSizeList.filter(folderSize => folderSize >= deleteAtLeast));
    console.log(sizeToDelete);
};

folderSize();
