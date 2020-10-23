const { models: {
  state
}} = require('../sequelizer')

exports.list = async () => {
  return await state.findAll();
}

exports.getById = async (id) => {
  return await state.findByPk(id);
}

exports.create = async (stateData) => {
  const newState = state.create(stateData)
  return newState;
}

//TO DO como se actualizaria la contraseña
//TO DO confirmar si se puede actualizar en stateId
exports.update = async (stateData, id) => {
  const updatedState = await state.update(stateData, {
    where: {
      id: id
    }
  })
  return updatedState;
}

exports.delete = async (id) => {
  const deletedState = await state.destroy({
    where: {
      id: id
    }
  });
  return deletedState;
}

exports.defaultData = async () => {
  await state.create({ name: "Activo" })
  await state.create({ name: "Finalizado" })
}