const express = require('express');
const router = express.Router();
const artikelController = require('../controllers/artikelController');

router.post('/get-artikel', artikelController.getAllartikel);
router.post('/get-artikel/:id', artikelController.getartikelById);
router.post('/add-artikel', artikelController.addartikel);
router.post('/update-artikel/:id', artikelController.updateartikel);
router.post('/delete-artikel/:id', artikelController.deleteartikel);

module.exports = router;
    