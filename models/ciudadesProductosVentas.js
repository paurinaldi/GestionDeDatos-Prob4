const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('open25', 'pau', 'RadiumRocket', {
  dialect: 'mysql',
});

const CiudadesProductosVentas = sequelize.define('CiudadesProductosVentas', {
  idCiudadesProductos: DataTypes.INTEGER,
  idVenta: DataTypes.INTEGER,
  Cantidad: DataTypes.INTEGER,
},
{
  timestamps: false,
});

exports.Model = CiudadesProductosVentas;