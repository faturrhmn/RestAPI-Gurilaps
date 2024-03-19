const express = require('express');
const router = express.Router();
const ulasanController = require('../controllers/ulasanController');

router.post('/get-ulasan', ulasanController.getAllUlasan);
router.post('/get-ulasan/:id', ulasanController.getUlasanById);
router.post('/add-ulasan', ulasanController.addUlasan);
router.post('/update-ulasan/:id', ulasanController.updateUlasan);
router.post('/delete-ulasan/:id', ulasanController.deleteUlasan);

module.exports = router;
