const { pool } = require("../database");

async function postLike(req, res) {
    
    const {id_publicacion, id_user} = req.body;
    const params = [id_publicacion, id_user];            
    const sql = `INSERT INTO likes(id_publicacion, id_user) VALUES (?, ?)`;
    const contador_likes = `UPDATE publicaciones SET likes = likes + 1 WHERE id_publicacion = ?`;

    try {
        // Verificar si el usuario ya ha dado like antes de insertar uno nuevo.
        const [existingLikes] = await pool.query(`SELECT * FROM TuneTales.likes WHERE id_publicacion = ? AND id_user = ?`, params);

        if (existingLikes.length === 0) {
            const [result] = await pool.query(sql, params);
            const [result_contador_likes] = await pool.query(contador_likes, params);
            let resultado = [];
            resultado.push(result);
            resultado.push(result_contador_likes);
            res.send(resultado);
        } 
    } 
    catch (err) {
        console.error(err);
        res.status(500).send("Error al añadir el like");
    } 
} 
 



async function deleteLike (req, res) {

    let sql = `DELETE FROM TuneTales.likes WHERE id_publicacion = ? AND id_user = ?`;
    const contador_likes = `UPDATE publicaciones SET likes = likes - 1 WHERE id_publicacion = ?`;


    const {id_publicacion, id_user} = req.body
    const params = [id_publicacion, id_user];

    try {

        let [result] = await pool.query(sql, params);
        const [result_contador_likes] = await pool.query(contador_likes, params);
        let resultado = [];
        resultado.push(result);
        resultado.push(result_contador_likes);
        res.send(resultado);
    }
    catch(err) {
        console.log(err);
    }
}






//COSAS DE IVANA


async function getLikesCount (req, res) {

    let sql = `SELECT COUNT(*) AS likeCount FROM TuneTales.likes WHERE id_publicacion = ?`

    const {id_publicacion} = req.params;
    const params = [id_publicacion]
    
    try {

        let [result] = await pool.query(sql, params);
        res.send(result);
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {postLike, deleteLike, getLikesCount}