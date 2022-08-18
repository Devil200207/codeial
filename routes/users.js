const express = require('express');
const router = express.Router();

const userscontroller = require('../controllers/users_controller');
const helpcontoller = require('../controllers/help_controllers');
router.get('/profile',userscontroller.profile);
router.get('/help',helpcontoller.help);

module.exports = router;