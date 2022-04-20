const mysql = require('mysql');
var fs = require('fs');
const fjson = require('./flight_table.json');
const fetch = require('node-fetch');
const getData = async () => {
    try {
        const names = await fetch('https://raw.githubusercontent.com/Vxt5074/Flights/main/repos/Flights/flight_table.json');
        const textData = await names.json();
        return textData;
    } catch (err) {
        console.log('fetch error', err);
    }
};



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


(async () => {
    const getText = await getData();
    console.log(getText)
})();