const {Router} = require("express");
const router = Router();
const userCtrl = require('../controllers/user.controller');


router.post('/register', userCtrl.addUser);