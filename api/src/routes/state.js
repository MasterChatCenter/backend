const express = require('express');
const stateController = require('../controllers/state');

const stateRoutes = express.Router()

// Get all states
stateRoutes.get('/states', stateController.list); 

// Get one state
stateRoutes.get('/states/:id', stateController.getById);

// Create state
stateRoutes.post('/states', stateController.create);

// Create state
stateRoutes.patch('/states/:id', stateController.update);

// Delete state
stateRoutes.delete('/states/:id', stateController.delete);

module.exports = stateRoutes