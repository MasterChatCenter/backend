const express = require('express');
const companyRoutes = require('./company');
const conversationRoutes = require('./conversation');
const customerRoutes = require('./customer');
const messageRoutes = require('./message');
const notesRoutes = require('./notes');
const roleRoutes = require('./role');
const stateRoutes = require('./state');
const userRoutes = require('./user');
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

  // Company Routes
  app.use(companyRoutes);
  // Conversation Routes
  app.use(conversationRoutes);
  // Customer Routes
  app.use(customerRoutes);
  // Message Routes
  app.use(messageRoutes);
  // Notes Routes
  app.use(notesRoutes);
  // Role Routes
  app.use(roleRoutes);
  // State Routes
  app.use(stateRoutes);
  // User Routes
  app.use(userRoutes);
}