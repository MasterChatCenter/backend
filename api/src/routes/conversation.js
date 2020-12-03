const express = require('express');
const conversationController = require('../controllers/conversation');

const conversationRoutes = express.Router()

// Get all conversations
conversationRoutes.get('/conversations', conversationController.list); 

// Get one conversation
conversationRoutes.get('/conversations/:id', conversationController.getById);

// Create conversation
conversationRoutes.post('/conversations', conversationController.create);

// Create conversation
conversationRoutes.patch('/conversations/:id', conversationController.update);

// Delete conversation
conversationRoutes.delete('/conversations/:id', conversationController.delete);

conversationRoutes.get('/converuser', conversationController.prueba)

module.exports = conversationRoutes