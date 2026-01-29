const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { authenticate, isAdmin } = require('../middleware/auth.middleware');

router.post('/', authenticate, bookingController.createBooking);
router.get('/my', authenticate, bookingController.getMyBookings);
router.patch('/:id/cancel', authenticate, bookingController.cancelBooking);

// Admin only routes
router.get('/', authenticate, isAdmin, bookingController.getAllBookings);
router.patch('/:id/status', authenticate, isAdmin, bookingController.updateBookingStatus);

module.exports = router;
