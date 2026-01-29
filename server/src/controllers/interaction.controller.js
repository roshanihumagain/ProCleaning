const Interaction = require('../models/interaction.model');

const createInquiry = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const newInquiry = await Interaction.createInquiry(name, email, message);
    res.status(201).json(newInquiry);
  } catch (error) {
    next(error);
  }
};

const getAllInquiries = async (req, res, next) => {
  try {
    const inquiries = await Interaction.getAllInquiries();
    res.status(200).json(inquiries);
  } catch (error) {
    next(error);
  }
};

const createTestimonial = async (req, res, next) => {
  try {
    const { text } = req.body;
    const newTestimonial = await Interaction.createTestimonial(req.user.id, text);
    res.status(201).json(newTestimonial);
  } catch (error) {
    next(error);
  }
};

const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Interaction.getApprovedTestimonials();
    res.status(200).json(testimonials);
  } catch (error) {
    next(error);
  }
};

const getAllTestimonialsAdmin = async (req, res, next) => {
  try {
    const testimonials = await Interaction.getAllTestimonials();
    res.status(200).json(testimonials);
  } catch (error) {
    next(error);
  }
};

const approveTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Interaction.approveTestimonial(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInquiry,
  getAllInquiries,
  createTestimonial,
  getTestimonials,
  getAllTestimonialsAdmin,
  approveTestimonial
};
