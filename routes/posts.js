const express = require('express');
const router = express.Router();

const postcontroller = require('../controllers/posts_controllers');

router.post('/create',postcontroller.create);

module.exports = router;