const express = require('express');
const router = express.Router();
const artikelController = require('../controllers/artikelController');

router.get('/get-artikel', artikelController.getAllartikel);
router.get('/get-artikel/:id', artikelController.getartikelById);
router.post('/add-artikel', artikelController.addartikel);
router.put('/update-artikel/:id', artikelController.updateartikel);
router.delete('/delete-artikel/:id', artikelController.deleteartikel);

module.exports = router;
