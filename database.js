let mysql = require('mysql2')
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', //
    password: 'root', //
    database: 'teste'
})
connection.connect((err) => {
    if (err) {
    console.log(err)
    return
    }
    console.log('Database conectada')
})

module.exports = connection




