const express = require('express');
const { Passport } = require('passport/lib');
const router = express.Router();
const passport = require('passport')

const postcontroller = require('../controllers/posts_controllers');

router.post('/create',passport.checkAuthentication,postcontroller.create);
router.get('/destroy/:id',passport.checkAuthentication,postcontroller.destroy)

module.exports = router;