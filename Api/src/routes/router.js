const express = require('express');
const userRoutes = require('./user');
const companyRoutes = require('./company');
const roleRoutes = require('./role');
const { authenticate } = require('../middleware/auth');

module.exports = (app) => {
  const apiRoutes = express.Router()

  // base rote 
  apiRoutes.get('/', function (req, res) {
    res.json({
      message: 'Welcome to our api',
    });
  });

  // exampel auth middleware
  apiRoutes.get('/auth', authenticate, function(req, res) {
    res.json({
      message: 'You are auth',
    });
  })

  app.use(apiRoutes);

  // User Routes
  app.use(userRoutes);
  // Company Routes
  app.use(companyRoutes);
  // Role Routes
  app.use(roleRoutes);
}