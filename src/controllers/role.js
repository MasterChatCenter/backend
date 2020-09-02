const roleService = require('../services/role');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');

// Get all roles
exports.list = async (req, res) => {
  try {
    const roles = await roleService.list();

    return okResponse(res, 200, { roles });
  } catch (err) {
    console.log('exports.list -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Get one role by id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const role = await roleService.getById(id);

    return okResponse(res, 200, { role });
  } catch (err) {
    console.log('exports.getOne -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Create role
exports.create = async (req, res) => {
  const roleData = req.body;

  // if (!phone || !uuid) {
  //   return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
  // }

  try {
    const newrole = await roleService.create(roleData);

    return okResponse(
      res,
      201,
      { user: newrole },
      'Usuario creado correctamente'
    );
  } catch (err) {
    console.log('exports.create -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Update role
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const updatedrole = await roleService.update(newData, id)

    return okResponse(res, 200, { updatedrole });
  } catch (err) {
    console.log('exports.update -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Delete role
exports.delete = async (req, res) => {
  try {

    const { id } = req.params;    

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const deletedCount = await roleService.delete(id)

    return okResponse(res, 200, { deletedCount });
  } catch (err) {
    console.log('exports.delete -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}