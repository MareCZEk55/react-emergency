var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "",
    database: "",
    user: "",
    password: ""
})

connection.connect(err => {
    if (err) throw err;
    console.log("Connected to DB")
});

module.exports = connection;
