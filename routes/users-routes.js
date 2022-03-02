const express = require('express');
const usersControllers = require('../controllers/users-conrollers');

const router = express.Router();



router.get('/', usersControllers.getUsers);

router.post('/signup', usersControllers.signup);

router.post('/login', usersControllers.login);



module.exports = router;