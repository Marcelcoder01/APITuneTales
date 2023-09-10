const {Router} = require("express");
const router = Router();
const userCtrl = require('../controllers/user.controller');
const publicationCtrl = require('../controllers/publication.controller');
const eventCtrl = require('../controllers/events.controller');
const commentsCtrl = require('../controllers/comments.controller')
const likesCtrl = require('../controllers/likes.controller')
const express = require('express');
const top3publicacionCtrl = require('../controllers/top3publication');
const multer = require('multer');

  function uploadFiles(){
    //definimos donde se van a almacenar los archivos en nuestro servidor local y un nombre unico para cada archivo
    const storage_multer = multer.diskStorage({
        destination: './uploads',
        filename: function (_req, file, cb) {
            var extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
            cb(null, Date.now() + extension )
        }
    })

    const upload = multer({ storage: storage_multer }).single('photo');
    return upload;
  }


// Rutas de usuario
router.post('/login', userCtrl.loginUser);
router.post('/register', userCtrl.addUser);
router.put('/editProfile',uploadFiles(), userCtrl.editProfile);

router.get('/profile',userCtrl.consultaSeguidor);
router.post('/profile', userCtrl.addSeguidor);
router.delete('/profile', userCtrl.delSeguidor)

// Rutas publicacion
router.get("/publicacion", publicationCtrl.getPublication);
router.post("/publicacion", uploadFiles(), publicationCtrl.postPublication);
router.put("/publicacion", publicationCtrl.putPublication);
router.delete("/publicacion",publicationCtrl.deletePublication);

//ruta top3publicacion
router.get("/top3publicaciones", top3publicacionCtrl.getTop3Publicaciones);

// Rutas eventos
router.post("/events",uploadFiles(), eventCtrl.addEvent);
router.put("/events", eventCtrl.editEvent);
router.get("/events", eventCtrl.getEvent);
router.get("/eventsAll", eventCtrl.getAllEvent);
router.delete("/events", eventCtrl.deleteEvent);

//comunidad
router.get('/comunidad', publicationCtrl.getPublications);

//paraTi
router.get('/paraTi', publicationCtrl.getPublicationsParaTi);

//comentarios
router.post('/comentario', commentsCtrl.postComment);
router.get('/comentarios', commentsCtrl.getComments);

//likes
router.post('/likes', likesCtrl.postLike);
router.delete('/likes', likesCtrl.deleteLike);

module.exports = router;