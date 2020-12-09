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
    name: {
      allowNull: true,
      type: DataTypes.STRING(45)
    },
    last_name: {
      allowNull: true,
      type: DataTypes.STRING(45)
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING(255)
    },
    active: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM(['root', 'admin', 'agent'])
    }
  },
  {
    timestamps: true,
  },
  {
    tableName: 'User'
  })
}
