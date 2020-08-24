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
      allowNull: true,
      type: DataTypes.STRING(60)
    },
    logo: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    facebookId: {
      allowNull: false,
      type: DataTypes.STRING(30)
    },
    tokenFacebook: {
      allowNull: false,
      type: DataTypes.STRING(200)
    }
  },
  {
    timestamps: true,
  },
  {
    tableName: 'Company'
  })
}
