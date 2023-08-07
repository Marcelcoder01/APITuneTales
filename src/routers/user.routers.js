const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');



// Rutas de usuario
router.put('/editProfile',userCtrl.editProfile);
router.get('/profile',userCtrl.consultaSeguidor);
router.post('/profile', userCtrl.addSeguidor);
router.delete('/profile', userCtrl.delSeguidor)



module.exports = router;