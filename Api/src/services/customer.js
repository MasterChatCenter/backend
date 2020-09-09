const { models: {
  customer
}} = require('../sequelizer')

exports.list = async () => {
  return await customer.findAll();
}

exports.getById = async (id) => {
  return await customer.findByPk(id);
}

exports.findBySenderId = async (senderId) => {
  const cus = await customer.findOne({
    where: {
      senderId: senderId
    }
  })

  return cus ? cus.dataValues : null
}

exports.create = async (customerData) => {
  const newCustomer = customer.create(customerData)
  return newCustomer;
}

//TO DO como se actualizaria la contraseña
//TO DO confirmar si se puede actualizar en customerId
exports.update = async (customerData, id) => {
  const updatedCustomer = await customer.update(customerData, {
    where: {
      id: id
    }
  })
  return updatedCustomer;
}

exports.delete = async (id) => {
  const deletedCustomer = await customer.destroy({
    where: {
      id: id
    }
  });
  return deletedCustomer;
}