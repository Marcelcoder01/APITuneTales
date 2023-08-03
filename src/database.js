const mysql = require("mysql2")

const connection = mysql.createPool({
    
    
    host: process.env.DB_HOST         || "tunetales.cy8l4e7adbqm.eu-west-3.rds.amazonaws.com",
    user: process.env.DB_USER         || "Marcel",
    password: process.env.DB_PASSWORD || "codenotch",
    database: process.env.DB_NAME     || "TuneTales",
    port: process.env.DB_PORT         || "3306",

});

module.exports = connection