const { models: {
  user
}} = require('../sequelizer')

const generalOptions = {
  attributes: {
    exclude: ['companyId','roleId']
  }
}

exports.list = async () => {
  return await user.findAll(generalOptions);
}

exports.getById = async (id) => {
  return await user.findByPk(id, generalOptions);
}

exports.create = async (userData) => {
  const newUser = user.create(userData)
  return newUser;
}

//TO DO como se actualizaria la contraseña
//TO DO confirmar si se puede actualizar en companyId
exports.update = async (userData, id) => {
  const updatedUser = await user.update(userData, {
    where: {
      id: id
    }
  })
  return updatedUser;
}

exports.delete = async (id) => {
  const deletedUser = await user.destroy({
    where: {
      id: id
    }
  });
  return deletedUser;
}