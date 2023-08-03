const mysql = require("mysql2")

const connection = mysql.createPool({
    
    
    host: process.env.DB_HOST         || "tunetales.cy8l4e7adbqm.eu-west-3.rds.amazonaws.com",
    user: process.env.DB_USER         || "Marcel",
    password: process.env.DB_PASSWORD || "codenotch",
    database: process.env.DB_NAME     || "TuneTales",
    port: process.env.DB_PORT         || "3306",

    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0

});

console.log("----------------------------------------------------------------------------------------------------")
console.log("------------------------------------------Connection is OK------------------------------------------")
console.log("----------------------------------------------------------------------------------------------------")


module.exports = connection