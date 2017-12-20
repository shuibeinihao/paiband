const fs = require('fs');

console.log('read source file');
const source = fs.readFileSync('./paiband_webapi.txt', 'utf8');
console.log('format content');
const sourceList = source.split('\n');
sourceList.sort((a, b) => {
    const namea = a.split(',')[0];
    const nameb = b.split(',')[0];
    if(namea > nameb) {
        return 1;
    } else if(namea === nameb) {
        return 0;
    } else {
        return -1;
    }
});
console.log('write to paiband_webapi_format.txt');
fs.writeFileSync('./paiband_webapi_format.txt', sourceList.join('\n'), 'utf8');
console.log('end');
