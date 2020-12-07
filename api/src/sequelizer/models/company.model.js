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
      type: DataTypes.CHAR(255)
    },
    logo: {
      allowNull: false,
      type: DataTypes.CHAR(255)
    },
    facebook_id: {
      allowNll: true,
      type: DataTypes.CHAR(255)
    },
    token_facebook: {
      allowNull: true,
      type: DataTypes.CHAR(255)
    }
  },
  {
    timestamps: true,
  },
  {
    tableName: 'Company'
  })
}
