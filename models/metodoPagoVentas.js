const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('open25', 'pau', 'RadiumRocket', {
  dialect: 'mysql',
});

const MetodosPagoVenta = sequelize.define('MetodosPagoVenta', {
  idMetodoPago: DataTypes.INTEGER,
  idDescuento: DataTypes.INTEGER,
  idCuotas: DataTypes.INTEGER
},
{
  timestamps: false,
});

exports.Model = MetodosPagoVenta;