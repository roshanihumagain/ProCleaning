const Booking = require('../models/booking.model');
const Service = require('../models/service.model');

const createBooking = async (req, res, next) => {
  try {
    const { serviceId, planType, bookingDate, bookingTime, address, phone, duration } = req.body;
    const userId = req.user.id;

    const service = await Service.getById(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Calculate total amount from DB prices
    const unitPrice = planType === 'HOURLY' ? service.price_hourly : service.price_daily;
    const count = duration || 1; // Default to 1 hour or 1 day if not specified
    const totalAmount = unitPrice * count;

    const newBooking = await Booking.create(
      userId,
      serviceId,
      planType,
      totalAmount,
      bookingDate,
      bookingTime,
      address,
      phone
    );

    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.getByUserId(req.user.id);
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.getAll();
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updatedBooking = await Booking.updateStatus(req.params.id, status);
    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
};

const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.getById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Ensure types match for comparison
    if (String(booking.user_id) !== String(req.user.id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (['COMPLETED', 'CANCELLED'].includes(booking.status)) {
      return res.status(400).json({ error: 'Cannot cancel completed or already cancelled booking' });
    }

    const updatedBooking = await Booking.updateStatus(req.params.id, 'CANCELLED');
    res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking
};
