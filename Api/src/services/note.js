const { models: {
  notes
}} = require('../sequelizer')

exports.list = async () => {
  return await notes.findAll();
}

exports.getById = async (id) => {
  return await notes.findByPk(id);
}

exports.create = async (noteData) => {  
  const newNote = notes.create(noteData)
  return newNote;
}

//TO DO como se actualizaria la contraseña
//TO DO confirmar si se puede actualizar en noteId
exports.update = async (noteData, id) => {
  const updatedNote = await notes.update(noteData, {
    where: {
      id: id
    }
  })
  return updatedNote;
}

exports.delete = async (id) => {
  const deletedNote = await notes.destroy({
    where: {
      id: id
    }
  });
  return deletedNote;
}