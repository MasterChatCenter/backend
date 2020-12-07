const bcrypt = require('bcryptjs');

const { 
  models: {
    user,
    company, 
    role
  }
} = require('../sequelizer')

const sequelize = require('../sequelizer');

const generalOptions = {
  attributes: {
    exclude: ['companyId','roleId']
  }
}

exports.list = async (queries) => {
  const { company_id } = queries;
  const where = company_id ? {
    company_id
  } : {};
  return await user.findAll({ ...generalOptions, where });
}

exports.findByUsername = async (username) => {
  return await user.findOne({
    where: {
      username: username
    }
  })
}

exports.getById = async (id) => {
  return await user.findByPk(id, {
    ...generalOptions,
    include: [
      {
        model: company,
        attributes: ['id', 'name', 'logo', 'facebookId', 'tokenFacebook', 'category']
      },
      {
        model: role,
        attributes: ['id','name','code']
      }
    ]
  });
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
    const updatedUser = await user.update(newData, {
      where: {
        id: id
      }
    })
    return updatedUser;
  }
  const newData = {
    ...userData
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

exports.filterUsers = async (query) => {
  const filteredUsers = await user.findAll({
    where: {
      ...query
    }
  });
  return filteredUsers;
}

exports.getUserWitoutCOnversation = async () => {
  const [users, metadata] = await sequelize.query('SELECT id as user_id FROM public."user" WHERE active = true AND id NOT IN (SELECT user_id FROM Conversation WHERE state_id = 1 GROUP BY user_id) limit 1')

  if (users.length > 0) {
    return users[0].user_id
  }

  return null
}
