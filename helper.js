const fs = require('fs');

const readingFile = async (filePath) => {
    return new Promise(resolve => {
        fs.open(filePath, 'r', (err, file) => {
            fs.readFile(file, { encoding: 'utf-8' }, (err, data) => {
                resolve(data);
            });
        });
    });
};

module.exports = {
    readingFile
};