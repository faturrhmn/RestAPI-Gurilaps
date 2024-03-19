const express = require('express');
const router = express.Router();
const wisataController = require('../controllers/wisataController');

router.post('/public-data-wisata', wisataController.getPublicData);
router.post('/public-data-wisata/:id', wisataController.getPublicDataById);
router.post('/add-data-wisata', wisataController.addData);
router.post('/delete-data-wisata/:id', wisataController.deleteData);
router.post('/update-data-wisata/:id', wisataController.updateData);

module.exports = router;
