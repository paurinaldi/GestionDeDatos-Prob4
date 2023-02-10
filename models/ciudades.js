const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('open25', 'pau', 'RadiumRocket', {
  dialect: 'mysql',
});

const Ciudad = sequelize.define('Ciudades', {
  Name: DataTypes.STRING,
  idProvincia: DataTypes.INTEGER
},
{
  timestamps: false,
})

exports.Model = Ciudad;