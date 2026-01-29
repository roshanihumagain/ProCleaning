const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interaction.controller');
const { authenticate, isAdmin } = require('../middleware/auth.middleware');

// Inquiries
router.post('/inquiries', interactionController.createInquiry);
router.get('/inquiries', authenticate, isAdmin, interactionController.getAllInquiries);

// Testimonials
router.post('/testimonials', authenticate, interactionController.createTestimonial);
router.get('/testimonials', interactionController.getTestimonials);
router.get('/testimonials/admin', authenticate, isAdmin, interactionController.getAllTestimonialsAdmin);
router.post('/testimonials/approve/:id', authenticate, isAdmin, interactionController.approveTestimonial);

module.exports = router;
