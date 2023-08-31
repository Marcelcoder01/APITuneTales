const { pool } = require('../database');
const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
const credentials = require('../tunetalesstorage.json');


//configuracion storage de Google Cloud
const storage = new Storage({
  credentials: credentials,
  projectId: 'tunetalesstorage',
});


async function addEvent(req, res){

    const photo = req.file;
    const{name_event, date, hour, place, id_user, description} = req.body


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
        name_event? name_event: null,
        date? date: null,
        hour? hour: null,
        place? place: null,
        photo? publicUrl: null,
        id_user? id_user: null,
        description? description: null
    ];
    

    let sql = `INSERT INTO eventos (name_event, date, hour, place, photo, id_user, description) VALUES (?, ?, ?, ?, ?, ?, ?);`

    try {

        let [result] = await pool.query(sql, params);
        res.send(result);
    }
    catch(err) {
        console.log(err);
        console.log("No ha sido posible crear el evento")
    }
  
}

  async function editEvent(req, res){

    let sql = `UPDATE TuneTales.eventos SET name_event = COALESCE(?,name_event), date = COALESCE(?,date), hour = COALESCE(?,hour), place = COALESCE(?,place), photo = COALESCE(?,photo), description = COALESCE(?,description) WHERE id_evento = ?;`
    const{name_event, date, hour, place, photo, description, id_evento} = req.body
    const params = [name_event? name_event: null, 
                    date? date: null, 
                    hour? hour: null,
                    place? place: null, 
                    photo? photo: null, 
                    description? description: null,
                    id_evento? id_evento:null]
  
    try{
        const [result] = await pool.query(sql, params)
        res.send(result);
    }   catch(error) {
        res.send(error);
    }
  }

  async function deleteEvent(req, res){

    let sql = `DELETE FROM TuneTales.eventos WHERE id_evento = ?;`
    const{id_evento} = req.body;
    const params = [id_evento]
  
    try{
        const [result] = await pool.query(sql, params)
        res.send(result);

        
    }   catch(error) {
        res.send(error);
    }
  }

  async function getEvent(req, res){

    let sql = `SELECT * FROM TuneTales.eventos WHERE id_user = ?;`
    const{id_user} = req.query
    const params = [id_user]
  
    try{
        const [result] = await pool.query(sql, params)
        res.send(result);
    }   catch(error) {
        res.send(error);
    }
  }

  async function getAllEvent(req, res) {

  
    try {
        let sql = `SELECT * FROM TuneTales.eventos;`
        const [result] = await pool.query(sql);
        res.json(result);
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener los eventos' });
    }
}
  
  
module.exports = {
    addEvent,
    editEvent,
    deleteEvent,
    getEvent,
    getAllEvent
  };
