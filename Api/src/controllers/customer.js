const customerService = require('../services/customer');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');

// Get all customers
exports.list = async (req, res) => {
  try {
    const customers = await customerService.list();

    return okResponse(res, 200, { customers });
  } catch (err) {
    console.log('exports.list -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Get one customer by id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const customer = await customerService.getById(id);

    return okResponse(res, 200, { customer });
  } catch (err) {
    console.log('exports.getOne -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Create customer
exports.create = async (req, res) => {
  const customerData = req.body;

  try {
    const newCustomer = await customerService.create(customerData);

    return okResponse(
      res,
      201,
      { user: newCustomer },
      'Usuario creado correctamente'
    );
  } catch (err) {
    console.log('exports.create -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Update customer
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const updatedCustomer = await customerService.update(newData, id)

    return okResponse(res, 200, { updatedCustomer });
  } catch (err) {
    console.log('exports.update -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Delete customer
exports.delete = async (req, res) => {
  try {

    const { id } = req.params;    

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const deletedCount = await customerService.delete(id)

    return okResponse(res, 200, { deletedCount });
  } catch (err) {
    console.log('exports.delete -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}