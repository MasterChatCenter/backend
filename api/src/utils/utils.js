const {
  errorsObj,
  defaultError,
  jwtSecret,
  jwtExpiresIn,
} = require('./constants');

exports.okResponse = (res, status, body, message) => {
  res.set('Access-Control-Allow-Origin', '*');
  return res.status(status).json({
    error: false,
    status,
    message,
    body,
  });
};

exports.errorResponse = (res, id, extra) => {
  let error = errorsObj[id];
  error = error ? error : defaultError;

  return res.status(error.httpCode).json({
    error: {
      id: id,
      message: error.message,
      extra: extra,
    },
  });
};

exports.generateToken = (doc) => {
  return jwt.sign(doc, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
};