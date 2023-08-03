const { Router } = require("express");
const router = router();
const publicationCtrl = require('../controllers/publication.controller');
const userController = require('../controllers/user.controller');

// Ruta  de login
router.post('/login', userController.loginUser);

// Rutas publicacion
router.post("/publicacion", publicationCtrl.postPublication);
router.put("/publicacion", publicationCtrl.putPublication);
router.delete("/publicacion",publicationCtrl.deletePublication);



module.exports = router; 