const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('open25', 'pau', 'RadiumRocket', {
  dialect: 'mysql',
});

const Productos = sequelize.define('Productos', {
  Nombre: DataTypes.STRING,
  idCategoria: DataTypes.INTEGER,
},
{
  timestamps: false,
});

exports.Model = Productos;