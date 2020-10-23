const express = require('express');
const messageController = require('../controllers/message');

const messageRoutes = express.Router()

// Get all messages
messageRoutes.get('/messages', messageController.list); 

// Get one message
messageRoutes.get('/messages/:id', messageController.getById);

// Create message
messageRoutes.post('/messages', messageController.create);

// Create message
messageRoutes.patch('/messages/:id', messageController.update);

// Delete message
messageRoutes.delete('/messages/:id', messageController.delete);

// Webhook endpoint
messageRoutes.post('/webhook', messageController.weebhook);

module.exports = messageRoutes