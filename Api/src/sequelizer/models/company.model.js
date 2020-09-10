const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('company', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(60)
    },
    logo: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    facebookId: {
      allowNull: true,
      type: DataTypes.STRING(30)
    },
    tokenFacebook: {
      allowNull: true,
      type: DataTypes.STRING(250)
    },
    category: {
      allowNull: true,
      type: DataTypes.STRING(45)
    }
  },
  {
    timestamps: true,
  },
  {
    tableName: 'Company'
  })
}
