const { pool } = require("../database");


async function postLike (req, res) {

    let sql = `INSERT INTO TuneTales.likes(id_publicacion, id_user) VALUES (?,?)`

    const {id_publicacion, id_user} = req.body;
    const params = [id_publicacion, id_user];

    console.log(sql)

    try {

        let [result] = await pool.query(sql, params);
        res.send(result);
        console.log("like añadido exitosamente")
    }
    catch(err) {
        console.log(err);
        console.log("No se ha podido añadir el like")
    }
}

async function deleteLike (req, res) {

    let sql = `DELETE FROM TuneTales.likes WHERE id_publicacion = ? AND id_user = ?`;

    const {id_publicacion, id_user} = req.params
    const params = [id_publicacion, id_user];

    try {

        let [result] = await pool.query(sql, params);
        res.send(result);
        console.log("like eliminado exitosamente")
    }
    catch(err) {
        console.log(err);
        console.log("No se ha podido eliminar el like")
    }
}


async function getLikesCount (req, res) {

    let sql = `SELECT COUNT(*) AS likeCount FROM TuneTales.likes WHERE id_publicacion = ?`

    const {id_publicacion} = req.params;
    const params = [id_publicacion]
    
    try {

        let [result] = await pool.query(sql, params);
        res.send(result);
        console.log("like eliminado exitosamente")
    }
    catch(err) {
        console.log(err);
        console.log("No se ha podido eliminar el like")
    }
}


module.exports = {postLike, deleteLike, getLikesCount}