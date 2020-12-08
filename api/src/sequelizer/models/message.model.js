const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('message', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    text:{
      allowNull: false,
      type: DataTypes.STRING(150)
    },
    username: {
      allowNull: true,
      type: DataTypes.STRING(80)
    },
    is_agent: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  },
  {
    timestamps: true,
  },
  {
    tableName: 'Message'
  })
}