const messageService = require('../services/message');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');

// Get all messages
exports.list = async (req, res) => {
  try {
    const messages = await messageService.list();

    return okResponse(res, 200, { messages });
  } catch (err) {
    console.log('exports.list -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Get one message by id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const message = await messageService.getById(id);

    return okResponse(res, 200, { message });
  } catch (err) {
    console.log('exports.getOne -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Create message
exports.create = async (req, res) => {
  const messageData = req.body;

  try {
    const newMessage = await messageService.create(messageData);

    return okResponse(
      res,
      201,
      { user: newMessage },
      'Usuario creado correctamente'
    );
  } catch (err) {
    console.log('exports.create -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Update message
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const updatedMessage = await messageService.update(newData, id)

    return okResponse(res, 200, { updatedMessage });
  } catch (err) {
    console.log('exports.update -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Delete message
exports.delete = async (req, res) => {
  try {

    const { id } = req.params;    

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const deletedCount = await messageService.delete(id)

    return okResponse(res, 200, { deletedCount });
  } catch (err) {
    console.log('exports.delete -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

exports.weebhook = async (req, res) => {
  try {
    const { senderId, pageId, text } = req.body;
    const message = {
      senderId,
      pageId,
      text,
    }

    if (!message) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const messageRes = await messageService.weebhook(message)

    return okResponse(res, 200, { messageRes });
  } catch (err) {
    console.log('exports.weebhook -> err', err);
    e
  }
}
