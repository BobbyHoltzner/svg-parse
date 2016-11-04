const fs = require("fs");
const xmldom = require("xmldom");


export default function jsonToSVG(uri, callbackFn) {
    fs.readFile(uri, 'utf8', function (err,data) {
        if(err)
            throw new TypeError("There is no file with this name.")
        let json = JSON.parse(data);
        let svg = "<svg></svg>";
        let doc = new xmldom.DOMParser().parseFromString(svg);
        let svgNode = doc.getElementsByTagName("svg");
        for(let element in json.attrs) {
            if(json.attrs.hasOwnProperty(element)) {
                svgNode[0].setAttribute(element, json.attrs[element]);
            }
        }
        for(let child of json.childs){
            let newCElement = doc.createElement(child.name);
            for(let element in child.attrs){
                newCElement.setAttribute(element, child.attrs[element]);
            }
            if(child.childs) {
                for(let grandChild of child.childs){
                    let newGCElement = doc.createElement(grandChild.name);
                    for(let element in grandChild.attrs){
                        newGCElement.setAttribute(element, grandChild.attrs[element]);
                        newCElement.appendChild(newGCElement);
                    }
                }
            }
            svgNode[0].appendChild(newCElement);
        }
        let svgString = doc.toString();
        callbackFn(svgString);
    });
}
