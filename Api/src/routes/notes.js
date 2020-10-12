const express = require('express');
const noteController = require('../controllers/note');

const noteRoutes = express.Router()

// Get all notes
noteRoutes.get('/notes', noteController.list); 

// Get one note
noteRoutes.get('/note/:id', noteController.getById);

// get by senderids
noteRoutes.get('/notes/:senderId', noteController.getBySenderId);

// Create note
noteRoutes.patch('/notes/:id', noteController.update);

// Delete note
noteRoutes.delete('/notes/:id', noteController.delete);

module.exports = noteRoutes