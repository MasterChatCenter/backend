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
    sendDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    senderId: {
      allowNull: false,
      type: DataTypes.STRING(100)
    }
  },
  {
    timestamps: true,
  },
  {
    tableName: 'Message'
  })
}