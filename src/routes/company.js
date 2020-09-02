const express = require('express');
const companyController = require('../controllers/company');

const companyRoutes = express.Router()

// Get all users
companyRoutes.get('/users', companyController.list); 

// Get one user
companyRoutes.get('/users/:id', companyController.getById);

// Create user
companyRoutes.post('/users', companyController.create);

// Create user
companyRoutes.patch('/users/:id', companyController.update);

// Delete user
companyRoutes.delete('/users/:id', companyController.delete);

module.exports = companyRoutes