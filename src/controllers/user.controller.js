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
  editProfile,
  consultaSeguidor,
  addSeguidor, 
  delSeguidor
};