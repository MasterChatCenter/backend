const express = require('express');
const noteController = require('../controllers/note');

const noteRoutes = express.Router()

// Get all notes
noteRoutes.get('/notes', noteController.list); 

// Get one note
noteRoutes.get('/notes/:id', noteController.getById);

// Create note
noteRoutes.post('/notes', noteController.create);

// Create note
noteRoutes.patch('/notes/:id', noteController.update);

// Delete note
noteRoutes.delete('/notes/:id', noteController.delete);

module.exports = noteRoutes