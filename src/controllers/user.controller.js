const { pool } = require('../database');

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
  let sql = `UPDATE usuarios SET user = COALESCE(?,user), email = COALESCE(?,email), password = COALESCE(?,password), instagram = COALESCE(?,instagram), facebook = COALESCE(?,facebook), twitter = COALESCE(?,twitter), birth_date = COALESCE(?,birth_date), music_type = COALESCE(?,music_type), description = COALESCE(?,description), photo = COALESCE(?,photo) WHERE id_user = 0;`;

  try {
      //peticion sql a la BBDD
      const [result] = await pool.query(sql, params);
      console.log(result);
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
