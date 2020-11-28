const express = require('express');
const authController = require('../controllers/auth');

const authRoutes = express.Router()

// Get all companies
authRoutes.post('/login', authController.login); 

module.exports = authRoutes