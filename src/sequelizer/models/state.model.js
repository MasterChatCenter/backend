const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('state', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type:DataTypes.STRING(45)
    }
  },
  {
    timestamps: false,
  },
  {
    tableName: 'State'
  })
}