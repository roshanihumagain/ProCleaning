const Booking = require('../models/booking.model');
const Payment = require('../models/payment.model');
const khaltiService = require('../services/khalti.service');

const initiatePayment = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    
    // 1. Validate booking exists and belongs to user
    const booking = await Booking.getById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    if (String(booking.user_id) !== String(req.user.id)) {
      return res.status(403).json({ error: 'Unauthorized to pay for this booking' });
    }

    if (booking.status === 'PAID') {
      return res.status(400).json({ error: 'Booking is already paid' });
    }

    // 2. Initiate payment with Khalti
    const returnUrl = `${process.env.FRONTEND_URL}/payment-callback`;
    const websiteUrl = process.env.FRONTEND_URL;
    
    const khaltiResponse = await khaltiService.initiatePayment(
      booking.total_amount,
      booking.id,
      `Booking #${booking.id}`,
      returnUrl,
      websiteUrl
    );

    // 3. Store payment record
    await Payment.create(booking.id, booking.total_amount, khaltiResponse.pidx);

    // 4. Update booking status
    await Booking.updateStatus(booking.id, 'PAYMENT_PENDING');

    res.status(200).json(khaltiResponse);
  } catch (error) {
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const { pidx } = req.body;

    // 1. Check if payment record exists
    const payment = await Payment.getByPidx(pidx);
    if (!payment) {
      return res.status(404).json({ error: 'Payment record not found' });
    }

    if (payment.status === 'VERIFIED') {
      return res.status(400).json({ error: 'Payment already verified' });
    }

    // 2. Call Khalti to verify status
    console.log(`Verifying payment for pidx: ${pidx}`);
    const verificationData = await khaltiService.verifyPayment(pidx);
    console.log('Khalti Verification Response:', verificationData);

    // 3. Mark payment as verified or failed in DB
    // Check for 'Completed' or 'completed' just in case
    if (verificationData.status && verificationData.status.toUpperCase() === 'COMPLETED') {
      await Payment.updateStatus(pidx, 'VERIFIED', verificationData, new Date());
      await Booking.updateStatus(payment.booking_id, 'PAID');
      res.status(200).json({ message: 'Payment verified successfully', data: verificationData });
    } else {
      await Payment.updateStatus(pidx, 'FAILED', verificationData);
      res.status(400).json({ message: 'Payment verification failed', data: verificationData });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  initiatePayment,
  verifyPayment
};
