const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('open25', 'pau', 'RadiumRocket', {
  dialect: 'mysql',
});

const Sucursales = sequelize.define('Sucursales', {
  idCiudad: DataTypes.INTEGER
},
{
  timestamps: false,
});

exports.Model = Sucursales;