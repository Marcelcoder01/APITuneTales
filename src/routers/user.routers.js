const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');



// Ruta  de login
router.post('/login', userCtrl.loginUser);



module.exports = router;