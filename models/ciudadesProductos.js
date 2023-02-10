const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('open25', 'pau', 'RadiumRocket', {
  dialect: 'mysql',
});

const CiudadesProductos = sequelize.define('CiudadesProductos', {
  idCiudad: DataTypes.INTEGER,
  idProductos: DataTypes.INTEGER,
  Precio: DataTypes.INTEGER,
},
{
  timestamps: false,
});

exports.Model = CiudadesProductos;