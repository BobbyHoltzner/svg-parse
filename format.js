var xmldom = require("xmldom");
var fs = require('fs');

export default function formatSVG(inFile, outFile, callbackFn) {
    fs.readFile(inFile, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        let inputSVG = data.substring(data.indexOf("<svg "), (data.indexOf("</svg>") + 6));
        let doc = new xmldom.DOMParser().parseFromString(inputSVG);
        let polygons = doc.getElementsByTagName("polygon");
        let pointsArray = [];
        for (let i = 0; i < polygons.length; i++) {
            for (let j = 0; j < polygons[i].attributes.length; j++) {
                if(polygons[i].attributes[j].nodeName === "points"){
                    pointsArray.push(polygons[i].attributes[j].nodeValue);
                    handlePoints(polygons[i].attributes[j].nodeValue, i, j);
                }
            }
        }

        function handlePoints(points, i, j) {
            let convertedPoints = [];
            let split = points.split(" ");
            let splitArr = [];
            let joint = "";
            let result = "";
            for(let i = 1; i < split.length+1 ; i++) {
                if(i % 2 == 0) {
                        splitArr = [split[i - 2], split[i-1]];
                        joint = splitArr.join(",");
                        convertedPoints.push(joint);
                }
            }
            result = convertedPoints.join(" ");
            polygons[i].setAttribute("points", result);
            return result;
        }
        callbackFn(outFile, doc.toString());
    });
}

