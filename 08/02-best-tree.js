const R = require('ramda');

const { readingFile } = require('../helper');

const bestTree = async () => {
    const data = await readingFile('./input.txt');
    const lines = data.split('\r\n').filter(x => x);

    const evaluatePathList = (pathList, value) => {
      for (let i = 0; i < pathList.length; i++) {
        const nextValue = Number(R.path(pathList[i], lines));
        if (nextValue < value) continue;
        else return i + 1;
      }
      return pathList.length;
    };

    const score = lines.reduce((subScore, line, lineIndex) => {
      const lineScore = line.split('').reduce((lineScore, tree, treeIndex) => {
        const treeVal = Number(tree);
        const visibleFromAbove = evaluatePathList(R.reverse(R.range(0, lineIndex)).map(thisLineIndex => [thisLineIndex, treeIndex]), treeVal);
        const visibleFromBelow = evaluatePathList(R.range(lineIndex + 1, lines.length).map(thisLineIndex => [thisLineIndex, treeIndex]), treeVal);
        const visibleFromLeft = evaluatePathList(R.reverse(R.range(0, treeIndex)).map(thisTreeIndex => [lineIndex, thisTreeIndex]), treeVal);
        const visibleFromRight = evaluatePathList(R.range(treeIndex + 1, line.length).map(thisTreeIndex => [lineIndex, thisTreeIndex]), treeVal);
        const visibilityScore = visibleFromAbove * visibleFromBelow * visibleFromLeft * visibleFromRight;
        return visibilityScore > lineScore ? visibilityScore : lineScore;
      }, 0);
      return lineScore > subScore ? lineScore : subScore;
    }, 0);

    console.log({ score });

};

bestTree();
