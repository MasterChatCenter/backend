const express = require('express');
const userController = require('../controllers/user');

const userRoutes = express.Router()

// Get all users
userRoutes.get('/users', userController.list);

// Get all filtered users
userRoutes.post('/users/filter', userController.filterUsers);

// Get one user
userRoutes.get('/users/:id', userController.getById);

// Create user
userRoutes.post('/users', userController.create);

// Create user
userRoutes.patch('/users/:id', userController.update);

// Delete user
userRoutes.delete('/users/:id', userController.delete);

module.exports = userRoutes