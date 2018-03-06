//modules/db.js
const mysql = require('mysql');

var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : ''
});

connection.query('USE symfony');

module.exports = connection;
