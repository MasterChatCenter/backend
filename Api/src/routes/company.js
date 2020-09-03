const express = require('express');
const companyController = require('../controllers/company');

const companyRoutes = express.Router()

// Get all companies
companyRoutes.get('/companies', companyController.list); 

// Get one company
companyRoutes.get('/companies/:id', companyController.getById);

// Create company
companyRoutes.post('/companies', companyController.create);

// Create company
companyRoutes.patch('/companies/:id', companyController.update);

// Delete company
companyRoutes.delete('/companies/:id', companyController.delete);

module.exports = companyRoutes