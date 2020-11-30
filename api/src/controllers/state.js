const stateService = require('../services/state');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');

// Get all states
exports.list = async (req, res) => {
  try {
    const states = await stateService.list();

    return okResponse(res, 200, { states });
  } catch (err) {
    console.log('exports.list -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Get one state by id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const state = await stateService.getById(id);

    return okResponse(res, 200, { state });
  } catch (err) {
    console.log('exports.getOne -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Create state
exports.create = async (req, res) => {
  const stateData = req.body;

  // if (!phone || !uuid) {
  //   return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
  // }

  try {
    const newState = await stateService.create(stateData);

    return okResponse(
      res,
      201,
      { user: newState },
      'Usuario creado correctamente'
    );
  } catch (err) {
    console.log('exports.create -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Update state
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const updatedState = await stateService.update(newData, id)

    return okResponse(res, 200, { updatedState });
  } catch (err) {
    console.log('exports.update -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Delete state
exports.delete = async (req, res) => {
  try {

    const { id } = req.params;    

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const deletedCount = await stateService.delete(id)

    return okResponse(res, 200, { deletedCount });
  } catch (err) {
    console.log('exports.delete -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}