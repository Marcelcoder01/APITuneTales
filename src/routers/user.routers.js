const {Router} = require("express");
const userCtrl = require('../controllers/user.controller');
const { Router } = require("express");
const router = Router();
const publicationCtrl = require('../controllers/publication.controller');
const userController = require('../controllers/user.controller');

router.post('/register', userCtrl.addUser);


// Ruta  de login
router.post('/login', userController.loginUser);
router.put('/editProfile',userController.editProfile);

// Rutas publicacion
router.post("/publicacion", publicationCtrl.postPublication);
router.put("/publicacion", publicationCtrl.putPublication);
router.delete("/publicacion",publicationCtrl.deletePublication);



module.exports = router; 
