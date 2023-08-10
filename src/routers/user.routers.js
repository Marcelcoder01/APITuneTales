const {Router} = require("express");
const userCtrl = require('../controllers/user.controller');
const router = Router();
const publicationCtrl = require('../controllers/publication.controller');
const express = require('express');
const top3publicacionCtrl = require('../controllers/top3publication')





// Ruta  de login
router.post('/login', userCtrl.loginUser);
router.put('/editProfile',userCtrl.editProfile);
router.post('/register', userCtrl.addUser);
// Rutas publicacion
router.post("/publicacion", publicationCtrl.postPublication);
router.put("/publicacion", publicationCtrl.putPublication);
router.delete("/publicacion",publicationCtrl.deletePublication);

//ruta top3publicacion
router.get("/top3publicaciones", top3publicacionCtrl.getTop3Publicaciones);



module.exports = router; 
