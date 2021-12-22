const authControllers = require('../services/users.js');
const router = require('express').Router();

router.post('/register', authControllers.register);// /api/users/register
router.post('/login', authControllers.loginUser); // /api/users/login

module.exports = router;