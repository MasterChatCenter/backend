const express = require('express');
const roleController = require('../controllers/role');

const roleRouter = express.Router()

// Get all roles
roleRouter.get('/roles', roleController.list); 

// Get one role
roleRouter.get('/roles/:id', roleController.getById);

// Create role
roleRouter.post('/roles', roleController.create);

// Create role
roleRouter.patch('/roles/:id', roleController.update);

// Delete role
roleRouter.delete('/roles/:id', roleController.delete);

module.exports = roleRouter