const { pool } = require('../database');
const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
const credentials = require('../tunetalesstorage.json');

//configuracion storage de Google Cloud
const storage = new Storage({
    credentials: credentials,
    projectId: 'tunetalesstorage',
  });

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

    let sql = `SELECT * FROM publicaciones WHERE id_publicacion = ?`;
    let sql2=  `SELECT u.* FROM publicaciones p JOIN
    usuarios u ON p.id_user = u.id_user WHERE
    p.id_publicacion = ?`;
    let sql3= `SELECT * FROM TuneTales.comentarios WHERE id_publicacion = ?`
    let sql4= `SELECT * FROM likes WHERE id_publicacion =?`

    const id_publicacion = req.query.id_publicacion;
    const params = [id_publicacion];

     // const id_publicacion = req.body;

    try {

        let [result] = await pool.query(sql, params);
        let [result2] = await pool.query(sql2, params);
        let [result3] = await pool.query(sql3, params);
        let [result4] = await pool.query(sql4, params);

        let data = [];
        data.push(result); 
        data.push(result2);
        data.push(result3);
        data.push(result4);

 
        res.send(data);
    }
    catch(err) {
        console.log(err);
    }
}
// añadir publicación utilizando id_publicacion desde postman 
async function postPublication (req, res) {
    const photo = req.file;
    const {id_user, multimedia, name_letter, letter, history} = req.body;

    let publicUrl = null;
  
    if (req.file != undefined){
        const bucketName = 'tunetalesfiles';
        const localFilePath = photo.path; // Ruta local al archivo original
        const fileName = localFilePath.replace(/^uploads\\/, '');

        const bucket = storage.bucket(bucketName);
        const file = bucket.file(`imagenes/${fileName}`); 

        // Lee el contenido del archivo local
        const fileContent = fs.readFileSync(localFilePath);

        // Sube el archivo al bucket
        await file.save(fileContent);

        publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;
    }

    const params = [
        id_user? id_user: null,
        multimedia? multimedia: null,
        name_letter? name_letter: null,
        letter? letter: null,
        history? history: null,
        photo? publicUrl: null,
    ];
    
    let sql = `INSERT INTO publicaciones (id_user, multimedia, name_letter, letter, history, likes, image) VALUES (?,?,?,?,?,0,?)`

    try {

        let [result] = await pool.query(sql, params);
        res.send(result);
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

        let [result] = await pool.query(sql, params);
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

        let [result] = await pool.query(sql, params);
        res.send(result);
        console.log("Publicacion eliminada correctamente")
    }
    catch(err) {
        console.log(err)
        console.log("Error al eliminar publicación")
    }
}

module.exports = {getPublication, postPublication, putPublication, deletePublication, getPublications, getPublicationsParaTi}