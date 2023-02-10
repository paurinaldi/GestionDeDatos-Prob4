const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('open25', 'pau', 'RadiumRocket', {
  dialect: 'mysql',
});

const Proveedor = sequelize.define('Proveedores', {
  idCiudad: DataTypes.INTEGER,
  Nombre: DataTypes.STRING,
  Apellido: DataTypes.STRING,
  RazonSocial: DataTypes.STRING,
  Telefono: DataTypes.STRING,
  Mail: DataTypes.STRING,
  Notas: DataTypes.STRING
},
{
  timestamps: false,
});

exports.Model = Proveedor;