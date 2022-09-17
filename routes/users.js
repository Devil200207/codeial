const express = require('express');
const router = express.Router();
const passport = require('passport');

const userscontroller = require('../controllers/users_controller');
const postcontroller = require('../controllers/post_controller');
const helpcontoller = require('../controllers/help_controllers');

router.get('/profile/:id',passport.checkAuthentication,userscontroller.profile);    
router.post('/update/:id',passport.checkAuthentication,userscontroller.update);        

router.get('/signin',userscontroller.signin);
router.get('/signup',userscontroller.signup);
router.get('/help',helpcontoller.help);
router.get('/post',postcontroller.post);


router.post('/create',userscontroller.create);

// using passport as an middleware to authanticate
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}
),userscontroller.createSession);

router.get('/signout',userscontroller.destroySession);

module.exports = router; 