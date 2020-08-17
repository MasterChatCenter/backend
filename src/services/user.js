const pg = require('../lib/pg');

const tableName = 'User'

exports.list = async (query = "") => {
  return await pg.list(tableName, query);
}

exports.getById = async (id, extra = "") => {
  return await pg.getById(tableName,id, extra);
}

exports.create = async (username, password, companyId, roleId) => {
  const insertQuery = `(username, password, active, companyId, roleId) VALUES (${username}, ${password}, ${true}, ${companyId}, ${roleId})`;
  const newUser = pg.create(tableName, insertQuery);
  return newUser;
}

//TO DO como se actualizaria la contraseña
//TO DO confirmar si se puede actualizar en companyId
exports.update = async (id, username, active = true, roleId) => {
  const updateQuery = `SET username = ${username}, active = ${active}, roleId = ${roleId}`;
  const updatedUser = await pg.update(tableName, id, updateQuery);
  return updatedUser;
}

exports.delete = async (id) => {
  const deletedUser = await pg.delete(tableName, id);
  return deletedUser;
}