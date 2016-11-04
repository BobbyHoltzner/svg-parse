const svgson = require('svgson');
const fs = require('fs');

export function svgFileToJson(uri) {
    fs.readFile(uri, 'utf-8', function(err, data) {
    if(err)
        throw new TypeError("This file does not exist");
    svgson(data, {

    }, function(result) {
        const resultString = JSON.stringify(result);
        return resultString;
    });
    });
}
export function svgToJson(outFile, svg) {
    svgson(svg, {

    }, function(result) {
        const resultString = JSON.stringify(result);
        fs.writeFile(outFile, resultString, "utf8", null);
        return resultString;
    });
}