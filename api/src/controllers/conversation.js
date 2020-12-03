const conversationService = require('../services/conversation');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');

// Get all conversations
exports.list = async (req, res) => {
  try {
    const conversations = await conversationService.list();

    return okResponse(res, 200, { conversations });
  } catch (err) {
    console.log('exports.list -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Get one conversation by id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const conversation = await conversationService.getById(id);

    return okResponse(res, 200, { conversation });
  } catch (err) {
    console.log('exports.getOne -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Create conversation
exports.create = async (req, res) => {
  const conversationData = req.body;

  try {
    const newConversation = await conversationService.create(conversationData);

    return okResponse(
      res,
      201,
      { user: newConversation },
      'Usuario creado correctamente'
    );
  } catch (err) {
    console.log('exports.create -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Update conversation
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const updatedConversation = await conversationService.update(newData, id)

    return okResponse(res, 200, { updatedConversation });
  } catch (err) {
    console.log('exports.update -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Delete conversation
exports.delete = async (req, res) => {
  try {

    const { id } = req.params;    

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const deletedCount = await conversationService.delete(id)

    return okResponse(res, 200, { deletedCount });
  } catch (err) {
    console.log('exports.delete -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}
