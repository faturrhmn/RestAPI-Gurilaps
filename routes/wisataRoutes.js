const express = require('express');
const router = express.Router();
const wisataController = require('../controllers/wisataController');

router.get('/public-data-wisata', wisataController.getPublicData);
router.get('/public-data-wisata/:id', wisataController.getPublicDataById);
router.post('/add-data-wisata', wisataController.addData);
router.delete('/delete-data-wisata/:id', wisataController.deleteData);
router.put('/update-data-wisata/:id', wisataController.updateData);

module.exports = router;
