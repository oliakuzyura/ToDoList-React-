const mysql = require('mysql');
require("dotenv").config();

let mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: "list",
    multipleStatements: true
  })
   
  mysqlConnection.connect(err => {
      if(!err){
        console.log("Connected");
      }
      else{
        console.log("Connection failed");
      }
  })

module.exports =  mysqlConnection;