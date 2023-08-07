const {Router} = require("express");
const router = Router();
//const express = require('express');
const userCtrl = require('../controllers/user.controller');
const publicationCtrl = require('../controllers/publication.controller');


// Rutas de usuario
router.post('/login', userCtrl.loginUser);
router.post('/register', userCtrl.addUser);
router.put('/editProfile',userCtrl.editProfile);
router.get('/profile',userCtrl.consultaSeguidor);
router.post('/profile', userCtrl.addSeguidor);
router.delete('/profile', userCtrl.delSeguidor)

// Rutas publicacion
router.post("/publicacion", publicationCtrl.postPublication);
router.put("/publicacion", publicationCtrl.putPublication);
router.delete("/publicacion",publicationCtrl.deletePublication);

module.exports = router; 
