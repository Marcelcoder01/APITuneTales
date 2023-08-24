const { pool } = require("../database");


async function postComment (req, res) {

    let sql = `INSERT INTO TuneTales.comentarios (id_publicacion, comentario, id_user_comment) VALUES (?,?,?)`

    const {id_publicacion, comentario, id_user_comment} = req.body;
    const params = [id_publicacion, comentario, id_user_comment];
    
    console.log(sql);
    console.log("este es un" + id_publicacion)

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

async function getComments(req, res){

    const id_publicacion = req.params.id_publicacion;
    const sql = `SELECT * FROM TuneTales.comentarios WHERE id_publicacion = ?`;
    const params = [id_publicacion];

    try {
        let [result] = await pool.query(sql, params);
        res.send(result);
        console.log("Comentarios de la publicación obtenidos con éxito")
    } catch (err) {
        console.log(err);
        console.log("No se ha podido obtener los comentarios");
    }
}



module.exports = {postComment, getComments}