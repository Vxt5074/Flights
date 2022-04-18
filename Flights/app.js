const mysql = require('mysql');
var table = [];

//Creating connection
const db = mysql.createConnection({
    host: "localhost",
    user: "vxt5074",
    password: "Wumbo125"
});

//Connecting
function flData() {
    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log('Server connected!');
        //Selecting schema
        db.query("USE flights", function (err, result, fields) {
            if (err) throw (err);
            console.log(result);
        })
        //Data retrieval?   
        db.query("SELECT * FROM flights", function (err, result, fields) {
            if (err) throw (err);
            else {
                table = result;
            }
        });
    });
}
flData();
console.log(JSON.stringify(table));