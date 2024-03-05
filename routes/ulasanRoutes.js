const express = require('express');
const router = express.Router();
const ulasanController = require('../controllers/ulasanController');

router.get('/get-ulasan', ulasanController.getAllUlasan);
router.get('/get-ulasan/:id', ulasanController.getUlasanById);
router.post('/add-ulasan', ulasanController.addUlasan);
router.put('/update-ulasan/:id', ulasanController.updateUlasan);
router.delete('/delete-ulasan/:id', ulasanController.deleteUlasan);

module.exports = router;
