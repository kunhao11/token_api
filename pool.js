const mysql = require("mysql")

const pool = mysql.createPool({
   host: "127.0.0.1",
   port: "3306",
   user: "root",
   password: "",
   database: "tedu",
   connectionLimit: "15", // 连接限制，默认15个
   multipleStatements: true, // 开启允许执行多条SQL命令
})

module.exports = pool
