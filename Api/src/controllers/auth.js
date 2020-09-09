const bcrypt = require('bcryptjs')
const authService = require('../services/auth');
const userService = require('../services/user');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');

const { jwtExpiresIn } = require('../utils/constants')

// Login User
exports.login = async (req, res) => {
  const { username, password } = req.body
  const user = await userService.findByUsername(username)
  if (user === null) {
    return errorResponse(res, errors.AUTHENTICATION_FAILED);
  }
  const validatePassword = await bcrypt.compare(password, user.password)
  if (validatePassword){
    const token = await authService.getToken({id: user.id})
    return okResponse(res, 200, { token });
  } else {
    return errorResponse(res, errors.AUTHENTICATION_FAILED);
  }
};
