const {Router} = require("express");
const router = Router();
//const express = require('express');
const userCtrl = require('../controllers/user.controller');
const publicationCtrl = require('../controllers/publication.controller');
const eventCtrl = require('../controllers/events.controller');


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


// Rutas eventos

router.post("/events", eventCtrl.addEvent);
router.put("/events", eventCtrl.editEvent);
router.get("/events", eventCtrl.getEvent);
router.delete("/events", eventCtrl.deleteEvent);

module.exports = router;