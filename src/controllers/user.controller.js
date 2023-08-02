const { pool } = require('../database');


// Función de inicio de sesión
async function loginUser(req, res) {
  const { username, password } = req.body;
  const sql = 'SELECT Id_user, name, last_name, email, photo FROM user WHERE email = ? AND password = ?';
  const params = [username, password];

  try {
    const [rows] = await pool.query(sql, params);

    if (rows.length > 0) {
      const user = {
        Id_user: rows[0].Id_user,
        name: rows[0].name,
        last_name: rows[0].last_name,
        email: rows[0].email,
        photo: rows[0].photo
      };
      res.status(200).json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Los datos de inicio de sesión no coinciden' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

// Exportar la función
module.exports = {
  loginUser
};