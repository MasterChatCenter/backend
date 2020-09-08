const bcrypt = require('bcrypt');

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

exports.findByUsername = async (username) => {
  return await user.findOne({
    where: {
      username: username
    }
  })
}

exports.getById = async (id) => {
  return await user.findByPk(id, generalOptions);
}

exports.create = async (userData) => {
  const password = await bcrypt.hash(userData.password, 7);
  const newData = {
    ...userData,
    password: password
  }
  console.log(newData)
  
  const newUser = user.create(newData)
  return newUser;
}

//TO DO como se actualizaria la contraseña
//TO DO confirmar si se puede actualizar en companyId
exports.update = async (userData, id) => {
  if (userData.password) {
    const password = await bcrypt.hash(userData.password, 7);
    const newData = {
      ...userData,
      password: password
    }
    console.log(newData)
  } else {
    const newData = {
      ...userData
    }
  }
  const updatedUser = await user.update(newData, {
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