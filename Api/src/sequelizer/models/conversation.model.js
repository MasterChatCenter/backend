const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('conversation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
    timestamps: true,
  },
  {
    tableName: 'Conversation'
  })
}