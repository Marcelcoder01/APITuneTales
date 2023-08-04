const {connection} = require("../database")

async function addUser(req, res){

    let sql = `INSERT INTO TuneTales.usuarios (user, email, password, birth_date) VALUES (?, ?, ?, ?);`
    const{user, email, password, birth_date} = req.body
    const params = [user, email, password, birth_date]

    try{
        const [result] = await connection.query(sql, params)
        res.send(result);
    }   catch(error) {
        res.send(error);
    }
}

module.exports = {addUser}
