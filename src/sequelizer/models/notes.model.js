const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('notes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    text: {
      allowNull: false,
      type:DataTypes.STRING
    }
  },
  {
    timestamps: true,
  },
  {
    tableName: 'Notes'
  })
}