const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/get-event', eventController.getAllevent);
router.post('/get-event/:id', eventController.geteventById);
router.post('/add-event', eventController.addevent);
router.post('/update-event/:id', eventController.updateevent);
router.post('/delete-event/:id', eventController.deleteevent);

module.exports = router;
