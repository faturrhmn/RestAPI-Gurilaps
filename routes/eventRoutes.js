const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/get-event', eventController.getAllevent);
router.get('/get-event/:id', eventController.geteventById);
router.post('/add-event', eventController.addevent);
router.put('/update-event/:id', eventController.updateevent);
router.delete('/delete-event/:id', eventController.deleteevent);

module.exports = router;
