const express = require('express');
const imageController = require('../controllers/image');
const { authenticate } = require('../middleware/auth');

const imageRoutes = express.Router()

imageRoutes.post('/image', authenticate, imageController.upload);

module.exports = imageRoutes