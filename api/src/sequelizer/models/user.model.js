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
      type: DataTypes.CHAR(50)
    },
    password: {
      allowNull: false,
      type: DataTypes.CHAR(80)
    },
    name: {
      allowNull: false,
      defaultValue: '',
      type: DataTypes.CHAR(45)
    },
    last_name: {
      allowNull: false,
      defaultValue: '',
      type: DataTypes.CHAR(45)
    },
    image: {
      allowNull: true,
      type: DataTypes.CHAR(255)
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
