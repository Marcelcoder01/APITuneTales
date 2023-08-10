const { pool } = require('../database');

async function getTop3Publicaciones(req, res) {
  console.log('aqui veo si entra en la funcion ');

  try {
    const [rows, fields] = await pool.promise().query(`
      SELECT *
      FROM publicaciones
      ORDER BY likes DESC
      LIMIT 3
    `);

    console.log('Top Publicaciones:', rows);
   
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error);
    res.status(500).json({ message: 'Error al obtener las publicaciones' });
  }
}

module.exports = {
  getTop3Publicaciones
};