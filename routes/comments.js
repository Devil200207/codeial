const express = require('express');
// const { Passport } = require('passport/lib');
const router = express.Router();
const passport = require('passport')

const commentscontroller = require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication,commentscontroller.create);

module.exports = router;