var fs = require('fs');
var current_dir = __dirname.replace(/\\/g,'/');
var path = current_dir.replace(/\\/g,'/') + "/../ghostComponents";


// parse ghost folder
fs.readdir(path, function (err, items) {
    var components = [];
    var imports = [];

    for (var i = 0; i < items.length; i++) {
        var ghostComp = items[i].slice(0, -3);
        var importStr = "import " + ghostComp + " from '" + path + "/" + ghostComp + "';";
        imports.push(importStr);
        components.push(ghostComp);

    }
    var text = buildText(imports, components);
    writeFile(text);
    console.log(text);
});

function buildText(imports, components) {
    let fileText = "import React from 'react';\n";
    for (var i = 0; i < imports.length; ++i) {
        fileText += imports[i] + "\n";
    }
    fileText += "\n";
    fileText += "export default [";
    for (var i = 0; i < components.length; ++i) {
        fileText += "<"+components[i] + " />,";
    }
    return fileText.slice(0, -1) + "];";
}

function writeFile(text) {
    fs.writeFile(current_dir + "/../components/GamePieces/Ghosts.js", text, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("import file created !");
    });
}

