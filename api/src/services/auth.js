const {generateToken} = require('../lib/jwt');

exports.getToken = async (id) => {
  return await generateToken(id)
}