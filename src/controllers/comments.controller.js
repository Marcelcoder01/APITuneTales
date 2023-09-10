const { pool } = require("../database");


async function postComment (req, res) {
    console.log("dentro de post comment API")

    let sql = `INSERT INTO TuneTales.comentarios (id_publicacion, comentario, id_user) VALUES (?,?,?)`

    const {id_publicacion, comentario, id_user} = req.body;
    const params = [id_publicacion, comentario, id_user];

    console.log(params);

    try {

        let [result] = await pool.query(sql, params);
        res.send(result);
        console.log("Comentario creado con exito")
    }
    catch(err) {
        console.log(err);
        console.log("No ha sido posible crear el comentario")
    }
}

async function getComments(req, res) {
    const id_publicacion = req.query.id_publicacion; // Cambio aqui el req.params por req query (estaba mal) por eso no traia los comentarios ;

    const sql = `SELECT * FROM TuneTales.comentarios WHERE id_publicacion = ?`;
    const params = [id_publicacion];

    try {
        console.log("estoy dentro del try")
        let [result] = await pool.query(sql, params);
        res.send(result);
        console.log("Comentarios de la publicación obtenidos con éxito")
    } catch (err) {
        console.log(err);
        console.log("No se ha podido obtener los comentarios");
    } 
}

 

module.exports = {postComment, getComments}