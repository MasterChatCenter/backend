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
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING(45)
    },
    lastname: {
      allowNull: true,
      type: DataTypes.STRING(45)
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING(60)
    }
  },
  {
    timestamps: true,
  },
  {
    tableName: 'User'
  })
}
