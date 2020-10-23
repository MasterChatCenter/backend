exports.acceptedExtensions = ['jpg', 'png', 'jpge'];
exports.maxImgSize = 3000000;

exports.jwtSecret = process.env.JWT_SECRET || 'SECRET';
exports.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '365d';

exports.errorsObj = {
  INTERNAL_ERROR: {
    httpCode: 400,
    message: 'Ha ocurrido un error interno, intenta más tarde.'
  },
  NOT_FOUND: {
    httpCode: 404,
    message: 'El recurso no existe o no tiene privilegios para acceder.'
  },
  MISSING_REQUIRED_FIELDS: {
    httpCode: 400,
    message: 'Faltan campos que son obligatorios.'
  },
  METHOD_NOT_ALLOWED: {
    httpCode: 405,
    message: 'Método no soportado.'
  },
  AUTHENTICATION_FAILED: {
    httpCode: 401,
    message: 'Ha ocurrido un error de autenticacion, inicie sesion de nuevo.'
  },
  NO_TOKEN_PROVIDED: {
    httpCode: 403,
    message: 'Inicie sesion de nuevo.'
  },
  UNAUTHORIZED: {
    httpCode: 401,
    message: 'El recurso no existe o necesitas privilegios para accederlo.'
  },
  THE_END_OBJ: '',
};

// Errors Names
exports.errors = {
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  MISSING_REQUIRED_FIELDS: 'MISSING_REQUIRED_FIELDS',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED',
  NO_TOKEN_PROVIDED: 'NO_TOKEN_PROVIDED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  THE_END_NAMES: '',
};

exports.defaultError = {
  httpCode: 500,
  description: 'Ha ocurrido un error inesperado, intente mas tarde.',
};