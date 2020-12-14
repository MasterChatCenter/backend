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
      type: DataTypes.STRING(255)
    },
    logo: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    facebook_id: {
      allowNll: true,
      type: DataTypes.STRING(255)
    },
    token_facebook: {
      allowNull: true,
      type: DataTypes.STRING(255)
    }
  },
  {
    timestamps: true,
  },
  {
    tableName: 'Company'
  })
}
