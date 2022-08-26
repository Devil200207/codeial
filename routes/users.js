const express = require('express');
const router = express.Router();
const passport = require('passport');

const userscontroller = require('../controllers/users_controller');
const helpcontoller = require('../controllers/help_controllers');
// const singincontroller = require('../controllers/users_controller');

router.get('/signin',userscontroller.signin);
router.get('/signup',userscontroller.signup);
router.get('/profile',userscontroller.profile);
router.get('/help',helpcontoller.help);

router.post('/create',userscontroller.create);

// using passport as an middleware to authanticate
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}
),userscontroller.createSession);

module.exports = router; 