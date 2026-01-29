const Service = require('../models/service.model');

const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.getAll();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.getById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

const createService = async (req, res, next) => {
  try {
    const { title, description, price_hourly, price_daily, image_url } = req.body;
    const newService = await Service.create(title, description, price_hourly, price_daily, image_url);
    res.status(201).json(newService);
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const { title, description, price_hourly, price_daily, image_url } = req.body;
    const updatedService = await Service.update(req.params.id, title, description, price_hourly, price_daily, image_url);
    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const result = await Service.delete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};
