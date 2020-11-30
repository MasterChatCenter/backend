const companyService = require('../services/company');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');
const FB = require('fb').default

// Get all companies
exports.list = async (req, res) => {
  try {
    const companies = await companyService.list();

    return okResponse(res, 200, { companies });
  } catch (err) {
    console.log('exports.list -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Get one company by id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const company = await companyService.getById(id);

    return okResponse(res, 200, { company });
  } catch (err) {
    console.log('exports.getOne -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Create company
exports.create = async (req, res) => {
  
  try {
    let companyData = req.body;
    const { token, id } = req.query;

    FB.setAccessToken(token);
    const listedPages = await FB.api(`${id}/accounts`, 'get');
    const page = listedPages.data[0];

    FB.setAccessToken(page.access_token);
    await FB.api(`${page.id}/subscribed_apps`, 'post', {
      subscribed_fields: [
        'messages',
        'messaging_postbacks',
        'messaging_optins',
      ],
    });

    companyData = ({
      ...companyData,
      tokenFacebook: page.access_token,
      facebookId: page.id,
    });

    const newCompany = await companyService.create(companyData);

    return okResponse(
      res,
      201,
      { company: newCompany },
      'Compañía creado correctamente'
    );
  } catch (err) {
    console.log('exports.create -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Update company
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const updatedCompany = await companyService.update(newData, id)

    return okResponse(res, 200, { updatedCompany });
  } catch (err) {
    console.log('exports.update -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Delete company
exports.delete = async (req, res) => {
  try {

    const { id } = req.params;    

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const deletedCount = await companyService.delete(id)

    return okResponse(res, 200, { deletedCount });
  } catch (err) {
    console.log('exports.delete -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}