const express = require('express');
const customerController = require('../controllers/customer');

const customerRoutes = express.Router()

// Get all customers
customerRoutes.get('/customers', customerController.list); 

// Get one customer
customerRoutes.get('/customers/:id', customerController.getById);

// Create customer
customerRoutes.post('/customers', customerController.create);

// Create customer
customerRoutes.patch('/customers/:id', customerController.update);

// Delete customer
customerRoutes.delete('/customers/:id', customerController.delete);

module.exports = customerRoutes