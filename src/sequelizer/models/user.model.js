const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(80)
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(45)
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING(45)
    }
  },
  {
    timestamps: true,
  },
  {
    tableName: 'User'
  })
}
