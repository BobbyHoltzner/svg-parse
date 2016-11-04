import formatSVG from "./format";
import {svgToJson} from "./svgToJson";
var argv = require('optimist').argv;
var inFile = argv.in;
var outFile = argv.out;
let formatted = formatSVG(inFile, outFile, svgToJson);


