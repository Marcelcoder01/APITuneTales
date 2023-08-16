const { pool } = require('../database');

async function getPublications (req, res){
    //seleccionamos todas las publicaciones
    let sql = `SELECT * FROM publicaciones`;

    //peticion sql a la BBDD
    try {
        //devuelve un array de publicaciones result = publicaciones[]
        const [result] = await pool.query(sql);
        res.send(result);
    } 
    catch (error) {
    console.log(error); 
    }
}

async function getPublicationsParaTi (req,res){

    const { id_user, user } = req.query; 
    const params = [id_user, user]; 

    //seleccionamos todas las publicaciones del los usuarios que sigue el usuario logueado
    let sql = `SELECT * FROM publicaciones p
    JOIN seguidores s ON p.id_user = s.id_seguido
    WHERE s.id_user = ?;`;

    if (user != undefined){
        sql = `SELECT *
        FROM publicaciones p
        JOIN usuarios u ON p.id_user = u.id_user
        WHERE u.user = '${user}';`;
    }

    try {
        //peticion sql a la BBDD
        const [result] = await pool.query(sql, params);
        res.send(result);
      } 
        catch (error) {
        console.log(error); 
      }
}

// obtener publicacion
async function getPublication (req, res) {

    let sql = `SELECT * FROM publicaciones WHERE id_publicacion = ?;`
    
    const id_publicacion = req.params.id_publicacion;
    const params = [id_publicacion];
     // const id_publicacion = req.body;

    console.log(sql)

    try {

        let [result] = await pool.promise().query(sql, params);
        res.send(result);
    }
    catch(err) {
        console.log(err);
    }
}

// añadir publicación utilizando id_publicacion desde postman 
async function postPublication (req, res) {

    let sql = `INSERT INTO TuneTales.publicaciones (link_soundCloud, name_letter, letter, history) VALUES (?,?,?,?)`

    const {link_soundCloud, name_letter, letter, history} = req.body;
    const params = [link_soundCloud, name_letter, letter, history];

    console.log(sql)

    try {

        let [result] = await pool.promise().query(sql, params);
        res.send(result);
        console.log("Publicación creada con exito")
    }
    catch(err) {
        console.log(err);
        console.log("No ha sido posible crear la publicación")
    }
}


// editar publicacion utilizando el num de la publi, sin id_user

async function putPublication (req, res) {

    let sql = `UPDATE TuneTales.publicaciones SET link_soundCloud = COALESCE (?, link_soundCloud), letter = COALESCE (?, letter), history = COALESCE (?, history) WHERE id_publicacion = ?`

    const {id_publicacion, link_soundCloud, letter, history} = req.body;
    const params = [
                link_soundCloud? link_soundCloud: null, 
                letter? letter: null, 
                history? history: null,
                id_publicacion? id_publicacion: null,
                ]

    console.log(sql)

    try {

        let [result] = await pool.promise().query(sql, params);
        res.send(result);
        console.log("Publicacion modificada correctamente")
    }
    catch(err) {
        console.log(err);
        console.log("No hemos podido modificar tu publicación")
    }
}

//eliminar publicacion ok

async function deletePublication (req, res) {

    let sql = `DELETE FROM publicaciones WHERE id_publicacion = ?;`

    const {id_publicacion} = req.body;
    const params = id_publicacion;

    try {

        let [result] = await pool.promise().query(sql, params);
        res.send(result);
        console.log("Publicacion eliminada correctamente")
    }
    catch(err) {
        console.log(err)
        console.log("Error al eliminar publicación")
    }
}

module.exports = {getPublication, postPublication, putPublication, deletePublication, getPublications, getPublicationsParaTi}