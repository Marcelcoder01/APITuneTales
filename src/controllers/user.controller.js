const { pool } = require('../database');

// FUNCION LOGIN 

async function loginUser(req, res) {
  const { user, password } = req.body; 
  const sql = 'SELECT * FROM usuarios WHERE user = ? AND password = ?'; 
  const params = [user, password]; 

  try {
    // const [rows] = await pool.promise().query(sql, params);
    const [rows] = await pool.query(sql, params);


    if (rows.length > 0) {
      const userData = rows[0];
      res.status(200).json({ success: true, user: userData });
    } else {
      res.status(401).json({ success: false, message: 'Los datos de inicio de sesión no coinciden' });
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

async function addUser(req, res){

  let sql = `INSERT INTO TuneTales.usuarios (user, email, password, birth_date) VALUES (?, ?, ?, ?);`
  const{user, email, password, birth_date} = req.body
  const params = [user, email, password, birth_date]

  try{
      const [result] = await pool.query(sql, params)
      res.send(result);
  }   catch(error) {
      res.send(error);
  }
}

//EDITAR PERFIL
async function editProfile (req, res){
    
  //recogemos los datos del libro a modificar por el body
  const {id_user, user, email, password, instagram, facebook, twitter, birth_date, music_type, description, photo} = req.body;
  const params = [
      user? user: null,
      email? email: null,
      password? password: null,
      instagram? instagram: null,
      facebook? facebook: null,
      twitter? twitter: null,
      birth_date? birth_date: null,
      music_type? music_type: null,
      description? description: null,
      photo? photo: null,
      id_user? id_user: null,
  ];

  //modificamos la informacion del usuario
  //cambiar el id_user
  let sql = `UPDATE usuarios SET user = COALESCE(?,user), email = COALESCE(?,email), password = COALESCE(?,password), instagram = COALESCE(?,instagram), facebook = COALESCE(?,facebook), twitter = COALESCE(?,twitter), birth_date = COALESCE(?,birth_date), music_type = COALESCE(?,music_type), description = COALESCE(?,description), photo = COALESCE(?,photo) WHERE id_user = ?;`;

  try {
      //peticion sql a la BBDD
      const [result] = await pool.query(sql, params);

    // Verificamos si se actualizó algún registro en la base de datos
    if (result.affectedRows > 0) {
      let selectSql = `SELECT * FROM usuarios WHERE id_user = ?;`;
      const [selectResult] = await pool.query(selectSql, [id_user]);
      res.send(selectResult[0]);
    }
  } 
  catch (error) {
  console.log(error); 
  }
}

//funcion que consulta si un usuario sigue a otro
async function consultaSeguidor(req, res){

  //recogemos los datos de usuario por la query
  const {id_user, id_seguido} = req.query;
  const params = [id_user, id_seguido];

  //seleccionamos la fila donde el usuario tiene una relacion con el usuario seguido
  let sql1 = `SELECT * FROM seguidores WHERE id_user = ? AND id_seguido = ?`;
  //seleccionamos las publicaciones del usuario
  let sql2 = `SELECT * FROM publicaciones WHERE id_user = ?`;
  //seleccionamos los eventos del usuario
  let sql3 = `SELECT * FROM eventos WHERE id_user = ?`;
  
  try {
      //peticion sql a la BBDD
      const [result1] = await pool.query(sql1, params);
      const [result2] = await pool.query(sql2, [id_seguido]);
      const [result3] = await pool.query(sql3, [id_seguido]);
      let result = [];
      result.push(result1);
      result.push(result2);
      result.push(result3);
      res.send(result);
  } 
  catch (error) {
  console.log(error); 
  }

}

//funcion que añade una nueva relacion de seguidores
async function addSeguidor(req, res){

 //recogemos los datos de la nueva relacion de seguidores a añadir por el body
 const {id_user, id_seguido} = req.body;
 const params = [id_user, id_seguido];

 //hacemos la consulta sql que añade una nueva fila a la tabla seguidores
 let sql= `INSERT INTO seguidores (id_user,id_seguido) VALUES (?,?);`;

 try {
   //peticion sql a la BBDD
   const [result] = await pool.query(sql, params);
   res.send(result);
 } 
   catch (error) {
   console.log(error); 
 }
}

//funcion que elimina una nueva relacion de seguidores
async function delSeguidor(req, res){

 //recogemos los datos de la nueva relacion de seguidores a añadir por el body
 const {id_user, id_seguido} = req.body;
 const params = [id_user, id_seguido];

 //hacemos la consulta sql que borra una nueva fila a la tabla seguidores
     //borramos la relacion de seguir a un usuario
     let sql= `DELETE FROM seguidores WHERE id_user = ? AND id_seguido = ? `;

 try {
   //peticion sql a la BBDD
   const [result] = await pool.query(sql, params);
   res.send(result);
 } 
   catch (error) {
   console.log(error); 
 }
}


module.exports = {
  loginUser,
  editProfile,
  addUser,
  consultaSeguidor,
  addSeguidor, 
  delSeguidor
};
