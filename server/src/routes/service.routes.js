const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { authenticate, isAdmin } = require('../middleware/auth.middleware');

// Public routes
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);

// Admin only routes
router.post('/', authenticate, isAdmin, serviceController.createService);
router.put('/:id', authenticate, isAdmin, serviceController.updateService);
router.delete('/:id', authenticate, isAdmin, serviceController.deleteService);

module.exports = router;
