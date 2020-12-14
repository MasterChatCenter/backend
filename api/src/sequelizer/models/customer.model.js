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
      allowNull: true,
      type: DataTypes.STRING(45)
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING(60)
    },
    sender_id: {
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
