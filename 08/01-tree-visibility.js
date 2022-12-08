const R = require('ramda');

const { readingFile } = require('../helper');

const treeVisibility = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n').filter(x => x);

    const evaluatePathList = (pathList, value) => {
      return pathList.every(path => {
        const nextTreeVal = Number(R.path(path, lines));
        return value > nextTreeVal;
      });
    };

    const count = lines.reduce((subCount, line, lineIndex) => {
      return subCount + line.split('').reduce((lineCount, tree, treeIndex) => {
        const treeVal = Number(tree);
        const visibleFromAbove = evaluatePathList(R.range(0, lineIndex).map(thisLineIndex => [thisLineIndex, treeIndex]), treeVal);
        const visibleFromBelow = evaluatePathList(R.range(lineIndex + 1, lines.length).map(thisLineIndex => [thisLineIndex, treeIndex]), treeVal);
        const visibleFromLeft = evaluatePathList(R.range(0, treeIndex).map(thisTreeIndex => [lineIndex, thisTreeIndex]), treeVal);
        const visibleFromRight = evaluatePathList(R.range(treeIndex + 1, line.length).map(thisTreeIndex => [lineIndex, thisTreeIndex]), treeVal);
        const isVisible = visibleFromAbove || visibleFromBelow || visibleFromLeft || visibleFromRight;
        return isVisible ? lineCount + 1 : lineCount;
      }, 0);
    }, 0);

    console.log({ count });

};

treeVisibility();
