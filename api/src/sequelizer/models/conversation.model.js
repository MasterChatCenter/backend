const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('conversation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    state: {
      allowNull: false,
      type: DataTypes.ENUM(['active','disabled'])
    },
    end_date: {
      allowNull: true,
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