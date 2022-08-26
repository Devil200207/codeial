const express = require('express');
const router = express.Router();

const userscontroller = require('../controllers/users_controller');
const helpcontoller = require('../controllers/help_controllers');
// const singincontroller = require('../controllers/users_controller');

router.get('/signin',userscontroller.signin);
router.get('/signup',userscontroller.signup);
router.get('/profile',userscontroller.profile);
router.get('/help',helpcontoller.help);
router.get('/sign-out',userscontroller.destroySession);

router.post('/create',userscontroller.create);
router.post('/create-session',userscontroller.createSession)

module.exports = router; 