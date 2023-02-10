const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('open25', 'pau', 'RadiumRocket', {
  dialect: 'mysql',
});

const Ventas = sequelize.define('Ventas', {
  idSucursal: DataTypes.INTEGER,
  idMetodoPagoVenta: DataTypes.INTEGER,
  timeStamp: DataTypes.DATE
},
{
  timestamps: false,
});

exports.Model = Ventas;