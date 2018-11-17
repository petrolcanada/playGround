var fs = require("fs");
var dir = "test.js"
var data = fs.readFileSync(dir);


console.log(data.toString());
console.log("program ended!");
