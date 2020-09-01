const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('customer', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(45)
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(60)
    },
    senderId: {
      allowNull: false,
      type: DataTypes.STRING(30)
    }
  },
  {
    timestamps: true,
  },
  {
    tableName: 'Customer'
  })
}
