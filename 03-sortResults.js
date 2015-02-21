var fs = require('fs');

var content = fs.readFileSync("./results.txt", "UTF-8");
var sorted = content.split("\n").sort().slice(1).join("\n");
fs.writeFileSync("./results.txt", sorted + '\n')