const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Ruta  de login
router.post('/login', userController.login);

module.exports = router;