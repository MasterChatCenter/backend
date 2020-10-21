const noteService = require('../services/note');
const customerService = require('../services/customer')
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');

// Get all notes
exports.list = async (req, res) => {
  try {
    const notes = await noteService.list();

    return okResponse(res, 200, { notes });
  } catch (err) {
    console.log('exports.list -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Get one note by id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const note = await noteService.getById(id);

    return okResponse(res, 200, { note });
  } catch (err) {
    console.log('exports.getOne -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

exports.getBySenderId = async (req, res) => {
  try {
    const { senderId } = req.params;

    if (!senderId) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const customer = await customerService.getBySenderId(senderId)

    if (customer) {
      
      const notes = await noteService.getByCustomerId(customer.id)

      return okResponse(res, 200, { notes })
    } 
    
    return errorResponse(res, errors.NOT_FOUND);
    
  } catch (err) {
    console.log('exports.gerBySenderId -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Create note
exports.create = async (req, res) => {
  const noteData = req.body;

  try {
    const newNote = await noteService.create(noteData);

    return okResponse(
      res,
      201,
      { user: newNote },
      'Usuario creado correctamente'
    );
  } catch (err) {
    console.log('exports.create -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Update note
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const updatedNote = await noteService.update(newData, id)

    return okResponse(res, 200, { updatedNote });
  } catch (err) {
    console.log('exports.update -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Delete note
exports.delete = async (req, res) => {
  try {

    const { id } = req.params;    

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const deletedCount = await noteService.delete(id)

    return okResponse(res, 200, { deletedCount });
  } catch (err) {
    console.log('exports.delete -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}