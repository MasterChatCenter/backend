const express = require('express');
const { authenticate } = require('../middleware/auth');

module.exports = (app) => {
  const apiRoutes = express.Router()

  apiRoutes.get('/', function (req, res) {
    res.json({
      message: 'Welcome to our api',
    });
  });

  apiRoutes.get('/auth', authenticate, function(req, res) {
    res.json({
      message: 'You are auth',
    });
  })

  app.use(apiRoutes);
}