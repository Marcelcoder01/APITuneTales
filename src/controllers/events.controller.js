const { pool } = require('../database');



async function addEvent(req, res){

    let sql = `INSERT INTO TuneTales.eventos (name_event, date, hour, place, photo, description) VALUES (?, ?, ?, ?, ?, ?);`
    const{name_event, date, hour, place, photo, description} = req.body
    const params = [name_event, date, hour, place, photo, description]
  
    try{
        const [result] = await pool.query(sql, params)
        res.send(result);
    }   catch(error) {
        res.send(error);
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
    const{id_evento} = req.body
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
    let sql = `SELECT * FROM TuneTales.eventos;`
  
    try {
        const [result] = await pool.query(sql);
        res.send(result);
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
