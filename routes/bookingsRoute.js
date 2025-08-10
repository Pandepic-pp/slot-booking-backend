const express = require('express');
const { addBooking, getBooking, getAvailableSlots, updateBooking } = require('../controllers/bookingsController');

const router = express.Router();

router.get('/bookings', getBooking);
router.post('/bookings', addBooking);
router.get('/slots', getAvailableSlots);
router.patch('/bookings', updateBooking);

module.exports = router;
