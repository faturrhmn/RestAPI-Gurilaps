const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.googleAuth);

module.exports = router;
