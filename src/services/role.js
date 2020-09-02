const { models: {
  role
}} = require('../sequelizer')

exports.list = async () => {
  return await role.findAll();
}

exports.getById = async (id) => {
  return await role.findByPk(id);
}

exports.create = async (roleData) => {
  const newRole = role.create(roleData)
  return newRole;
}

//TO DO como se actualizaria la contraseña
//TO DO confirmar si se puede actualizar en roleId
exports.update = async (roleData, id) => {
  const updatedRole = await role.update(roleData, {
    where: {
      id: id
    }
  })
  return updatedRole;
}

exports.delete = async (id) => {
  const deletedRole = await role.destroy({
    where: {
      id: id
    }
  });
  return deletedRole;
}