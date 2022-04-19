const mysql = require('mysql');
var fs = require('fs');

//Creating connection
const db = mysql.createConnection({
    host: "localhost",
    user: "vxt5074",
    password: "Wumbo125"
});

//Connecting
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Server connected!');
    //Selecting schema
    db.query("USE flights", function (err, result) {
        if (err) throw (err);
        console.log(result);
    })
    //Data retrieval?   
    db.query("SELECT * FROM flights", function (err, result) {
        if (err) throw (err);
        else {
            var table = {};
            table = result;
            setValue(result);
            console.log(JSON.stringify(table));
        }
    });
});
function setValue(value) {
    table = value
    fs.writeFile('flight_table.json', (JSON.stringify(table)), function (err) {
        if (err) throw (err);
        else {
            console.log('Saved!');
        }
    })
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("flight_table.json", function (text) {
    var data = JSON.parse(text);
    console.log(data);
})