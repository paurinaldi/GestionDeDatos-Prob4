const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('open25', 'pau', 'RadiumRocket', {
  dialect: 'mysql',
});

const Provincias = sequelize.define('Provincias', {
  Name: DataTypes.STRING
},
{
  timestamps: false,
});

exports.Model = Provincias;