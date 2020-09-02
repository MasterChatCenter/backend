const { models: {
  company
}} = require('../sequelizer')

exports.list = async () => {
  return await company.findAll();
}

exports.getById = async (id) => {
  return await company.findByPk(id);
}

exports.create = async (companyData) => {
  const newCompany = company.create(companyData)
  return newCompany;
}

//TO DO como se actualizaria la contraseña
//TO DO confirmar si se puede actualizar en companyId
exports.update = async (companyData, id) => {
  const updatedUser = await company.update(companyData, {
    where: {
      id: id
    }
  })
  return updatedCompany;
}

exports.delete = async (id) => {
  const deletedUser = await company.destroy({
    where: {
      id: id
    }
  });
  return deletedCompany;
}