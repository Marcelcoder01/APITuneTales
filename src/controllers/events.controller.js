const { pool } = require('../database');



async function addEvent(req, res){
    const photo = req.file;
    const{name_event, date, hour, place, id_user, description}  = JSON.parse(req.body.update_event);

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

    let sql = `INSERT INTO TuneTales.eventos (name_event, date, hour, place, photo, id_user, description) VALUES (?, ?, ?, ?, ?, ?, ?);`
     
    const params = [name_event, date, hour, place, publicUrl, id_user, description]
  
    try{
        const [result] = await pool.query(sql, params)
        res.send(result);
    }   catch(error) {
        res.send(error);
    }
  }

  async function editEvent(req, res){
    const photo = req.file;
    const{name_event, date, hour, place, description, id_evento}  = JSON.parse(req.body.update_event);

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


    const params = [name_event? name_event: null, 
                    date? date: null, 
                    hour? hour: null,
                    place? place: null, 
                    photo? publicUrl: null, 
                    description? description: null,
                    id_evento? id_evento:null]

    let sql = `UPDATE TuneTales.eventos SET name_event = COALESCE(?,name_event), date = COALESCE(?,date), hour = COALESCE(?,hour), place = COALESCE(?,place), photo = COALESCE(?,photo), description = COALESCE(?,description) WHERE id_evento = ?;`

  
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
